import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../firebase";
import { fetchUsersData } from "../../redux/actions";

const Comments = (props) => {
  const [commentsState, setCommentsState] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersState);

  useEffect(() => {
    function matchUserToComment(comments) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].hasOwnProperty("user")) {
          continue;
        }
        
        const user = users.users.find((x) => x.uid === comments[i].creator);
        if (user == undefined) {
          dispatch(fetchUsersData(comments[i].creator, false));
        } else {
          comments[i].user = user;
        }
      }
      setCommentsState(comments);
    }

    if (props.route.params.postId !== postId) {
      db.collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .doc(props.route.params.postId)
        .collection("comments")
        .get()
        .then((snapshot) => {
          let comments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          matchUserToComment(comments);
        });
      setPostId(props.route.params.postId);
    } else {
      matchUserToComment(commentsState);
    }
  }, [props.route.params.postId, users.users]);

  const onCommendSend = () => {
    db.collection("posts")
      .doc(props.route.params.uid)
      .collection("userPosts")
      .doc(props.route.params.postId)
      .collection("comments")
      .add({
        creator: auth.currentUser.uid,
        text,
      });
    
  };

  return (
    <View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={commentsState}
        renderItem={({ item }) => {
          return (
            <View>
              {item.user !== undefined ? <Text>{item.user.name}</Text> : null}
              <Text>{item.text}</Text>
            </View>
          );
        }}
      />
      <View>
        <TextInput
          placeholder="comment..."
          onChangeText={(text) => setText(text)}
        />
        <Button title="Send" onPress={() => onCommendSend()} />
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({});
