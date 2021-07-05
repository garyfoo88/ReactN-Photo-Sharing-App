import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";
import { auth, db } from "../../firebase";

const Feed = () => {
  const [userPost, setUserPost] = useState([]);
  const [users, setUsers] = useState(null);
  const [following, setFollowing] = useState(false);
  const user = useSelector((state) => state.userState);

  useEffect(() => {

  }, []);


  if (users === null) return <View></View>;
  return (
    <View style={styles.container}>
      
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

