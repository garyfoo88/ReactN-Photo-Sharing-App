import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";
import { auth, db } from "../../firebase";

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const usersState = useSelector((state) => state.usersState);
  const userState = useSelector((state) => state.userState);
  useEffect(() => {
    let posts = [];
    if (usersState.usersFollowingLoaded == userState.following.length) {
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
  }, [usersState.usersFollowingLoaded]);

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
              <Text
                onPress={() =>
                  props.navigation.navigate("Comments", { postId: item.id, uid: item.user.uid  })
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
