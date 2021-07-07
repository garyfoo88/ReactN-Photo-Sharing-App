import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";
import { auth, db } from "../../firebase";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const usersState = useSelector((state) => state.usersState);
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    let posts = [];
    if (usersState.userLoaded == userState.following.length) {
      for (let i = 0; i < userState.following.length; i++) {
        const user = usersState.users.find(
          (el) => el.uid === userState.following[i]
        );
        if (user !== undefined) {
          posts = [...posts, ...user.posts];
        }
      }
      posts.sort((x, y) => {
        return x.creation - y.creation;
      });
      setPosts(posts);
    }
  }, [usersState.userLoaded]);

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={posts}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.user.name}</Text>
              <Image source={{ uri: item.downloadURL }} />
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
