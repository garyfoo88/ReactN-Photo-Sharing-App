import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";
import { auth, db } from "../../firebase";

const Profile = (props) => {
  const [userPost, setUserPost] = useState([]);
  const [users, setUsers] = useState(null);
  const [following, setFollowing] = useState(false);
  const user = useSelector((state) => state.userState);

  useEffect(() => {
    if (props.route.params.uid === auth.currentUser.uid) {
      setUsers(user.currentUser);
      setUserPost(user.posts);
    } else {
      db.collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUsers(snapshot.data());
          } else {
            console.log(snapshot);
          }
        });

      db.collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPost(posts);
        });
    }

    if (user.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.route.params.uid, user.following]);

  const onFollow = () => {
    db.collection("following")
      .doc(auth.currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({});
  };

  const onUnfollow = () => {
    db.collection("following")
      .doc(auth.currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete();
  };

  const onLogout = () => {
    auth.signOut();
  }

  if (users === null) return <View></View>;
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{users.name}</Text>
        <Text>{users.email}</Text>
        {props.route.params.uid !== auth.currentUser.uid ? (
          <View>
            {following ? (
              <Button
                title="Following"
                onPress={() => {
                  onUnfollow();
                }}
              />
            ) : (
              <Button
                title="Follow"
                onPress={() => {
                  onFollow();
                }}
              />
            )}
          </View>
        ) : (
          <Button
            title="Logout"
            onPress={() => {
              onLogout();
            }}
          />
        )}
      </View>
      <View style={styles.containerGallery}>
        <FlatList
          //key={1}
          //keyExtractor={item => item.id}
          numColumns={3}
          horizontal={false}
          data={userPost}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerImage}>
                <Image
                  style={styles.image}
                  source={{ uri: item.downloadUrl }}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Profile;

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
