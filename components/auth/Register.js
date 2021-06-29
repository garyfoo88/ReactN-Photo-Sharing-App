import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { auth, db } from "../../firebase";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUp = () => {
    const { name, email, password } = input;
    auth.createUserWithEmailAndPassword(email, password).then((res) => {
        db.collection("users").doc(auth.currentUser.uid).set({
          name,
          email
        })
    }).catch((err) => {
        console.log(err)
    })
  };

  return (
    <View>
      <TextInput
        placeholder="name"
        value={input.name}
        onChangeText={(name) => {
          setInput({ ...input, name });
        }}
      />
      <TextInput
        placeholder="email"
        value={input.email}
        onChangeText={(email) => {
          setInput({ ...input, email });
        }}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        value={input.password}
        onChangeText={(password) => {
          setInput({ ...input, password });
        }}
      />
      <Button
        onPress={() => {
          onSignUp();
        }}
        title="Sign Up"
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
