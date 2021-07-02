import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";
import firebase from "firebase";

const Save = (props) => {
  const [caption, setCaption] = useState("");
  const childPath = `post/${
    firebase.auth().currentUser.uid
  }/${Math.random().toString(36)}`;
  const uploadImage = async () => {
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);
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
      <Button title="Save" onPress={() => {}} />
    </View>
  );
};

export default Save;

const styles = StyleSheet.create({});
