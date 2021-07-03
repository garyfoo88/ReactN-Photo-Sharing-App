import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../../firebase";

const Search = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    db.collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
  };

  return (
    <View>
      <Text>Feed</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
