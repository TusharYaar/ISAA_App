import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Title } from "react-native-paper";

import { useSelector } from "react-redux";

const data = [
  {
    id: 1,
    name: "Login",
  },
  {
    id: 2,
    name: "Fingerprint",
  },
  {
    id: 3,
    name: "Scan QR",
  },
  {
    id: 4,
    name: "Approve Payment",
  },
];
const Stepper = () => {
  const { currentStep } = useSelector((state) => state);
  return (
    <View style={styles.container}>
      <Title>{data[currentStep].name}</Title>
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
  },
});
