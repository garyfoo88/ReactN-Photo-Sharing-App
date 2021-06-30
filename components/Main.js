import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/actions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { user } from "../redux/reducers/user";

const Main = () => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.userState)

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>User is logged in</Text>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
