import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image,Button } from "react-native";

const Save = (props) => {
  const [caption, setCaption] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} style={{ flex: 1 }} />
      <TextInput
        placeholder="Write a Caption . . ."
        onChangeText={(e) => {
          setCaption(e);
        }}
      />
    </View>
  );
};

export default Save;

const styles = StyleSheet.create({});
