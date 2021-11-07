import React from "react";

import { StyleSheet } from "react-native";
import { Button, Headline, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const LoginScreen = () => {
  return (
    <SafeAreaView>
      <Headline>Login</Headline>
      <TextInput />
      <TextInput />
      <Button mode="contained">Login</Button>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
