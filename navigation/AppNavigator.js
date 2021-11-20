import React, { useState } from "react";

import { View, StyleSheet } from "react-native";

import Stepper from "../components/Stepper";

import { PaymentStack } from "./StackNavigator";

import { SafeAreaView } from "react-native-safe-area-context";
const AppNavigator = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Stepper />
      <View style={styles.container}>
        <PaymentStack />
      </View>
    </SafeAreaView>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
