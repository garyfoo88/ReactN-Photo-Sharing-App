import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";

const Profile = (props) => {
  const user = useSelector((state) => state.userState);
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.currentUser.name}</Text>
        <Text>{user.currentUser.email}</Text>
      </View>
      <View style={styles.containerGallery}>
        <FlatList
          //key={1}
          //keyExtractor={item => item.id}
          numColumns={3}
          horizontal={false}
          data={user.posts}
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
    marginTop: 40,
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
