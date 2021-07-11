import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";
import { auth, db } from "../../firebase";

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const usersState = useSelector((state) => state.usersState);
  const userState = useSelector((state) => state.userState);
  useEffect(() => {
    if (
      usersState.usersFollowingLoaded == userState.following.length &&
      usersState.following.length !== 0
    ) {
      usersState.feed.sort((x, y) => {
        return x.creation - y.creation;
      });
      setPosts(usersState.feed);
    }
  }, [usersState.usersFollowingLoaded, usersState.feed]);

  const onLikePress = (userId, postId) => {
    db.collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(auth.currentUser.uid)
      .set({});
  };

  const onDislikePress = (userId, postId) => {
    db.collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(auth.currentUser.uid)
      .delete();
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={posts}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.caption}</Text>
              <Image style={styles.image} source={{ uri: item.downloadUrl }} />
              {item.currentUserLike ? (
                <Button
                  title="Dislike"
                  onPress={() => onDislikePress(item.user.uid, item.id)}
                />
              ) : (
                <Button
                  title="Like"
                  onPress={() => onLikePress(item.user.uid, item.id)}
                />
              )}
              <Text
                onPress={() =>
                  props.navigation.navigate("Comments", {
                    postId: item.id,
                    uid: item.user.uid,
                  })
                }
              >
                View Comments...
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {},

  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },

  containerImage: {
    flex: 1 / 3,
  },
});
