import React from "react";

import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "../screens/LoginScreen";

import { useSelector } from "react-redux";

const AppNavigator = () => {
  const { accountNo } = useSelector((state) => state);
  if (accountNo.length < 10) return <LoginScreen />;
  else return <View />;
};

export default AppNavigator;

const styles = StyleSheet.create({});
