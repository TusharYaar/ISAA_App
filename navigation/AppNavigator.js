import React from "react";

import { View } from "react-native";
import LoginScreen from "../screens/LoginScreen";

import { useSelector } from "react-redux";

const AppNavigator = () => {
  const { accountNo } = useSelector((state) => state);
  if (accountNo.length == 0) return <LoginScreen />;
  else return <View />;
};

export default AppNavigator;
