import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { auth } from "../../firebase";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const onLogin = () => {
    const { email, password } = input;
    auth.signInWithEmailAndPassword(email, password).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
  };

  return (
    <View>
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
          onLogin();
        }}
        title="Login"
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
