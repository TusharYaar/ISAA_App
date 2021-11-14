import React from "react";

import { View } from "react-native";
import LoginScreen from "../screens/LoginScreen";

import { PaymentStack } from "./StackNavigator";

import { useSelector } from "react-redux";

const AppNavigator = () => {
  const { accountNumber } = useSelector((state) => state);
  if (accountNumber.length == 0) return <LoginScreen />;
  else return <PaymentStack />;
};

export default AppNavigator;
