import React from "react";

import { View, StyleSheet, KeyboardAvoidingView } from "react-native";

import Stepper from "../components/Stepper";

import { PaymentStack } from "./StackNavigator";

import { SafeAreaView } from "react-native-safe-area-context";
const AppNavigator = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Stepper />
      <KeyboardAvoidingView behaviors="height" style={styles.container}>
        <PaymentStack />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
