import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase";

const Search = (props) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    db.collection("users")
      .where("name", "==", search)
      .get()
      .then((snapshot) => {
        let usersSnapshot = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });

        setUsers(usersSnapshot);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Search User..."
        onChangeText={(search) => fetchUsers(search)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Profile", { uid: item.id })
              }
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
