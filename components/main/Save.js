import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";
import firebase from "firebase";
import { auth, db, serverTime } from "../../firebase";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { fetchUserPosts } from "../../redux/actions";

const Save = (props) => {
  const [caption, setCaption] = useState("");
  const childPath = `post/${
    firebase.auth().currentUser.uid
  }/${Math.random().toString(36)}`;

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();

    //uploads the image to storage
    //https://firebase.google.com/docs/storage/web/upload-files
    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = (snapshot) => {};

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
      });
    };

    const taskError = (snapshot) => {};

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadUrl) => {
    db.collection("posts")
      .doc(auth.currentUser.uid)
      .collection("userPosts")
      .add({
        downloadUrl,
        caption,
        likesCount: 0,
        creation: serverTime,
      })
      .then(() => {
        props.navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} style={{ flex: 1 }} />
      <TextInput
        placeholder="Write a Caption . . ."
        onChangeText={(e) => {
          setCaption(e);
        }}
      />
      <Button
        title="Save"
        onPress={() => {
          uploadImage();
        }}
      />
    </View>
  );
};

export default Save;

const styles = StyleSheet.create({});
