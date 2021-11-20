import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Stepper = () => {
  return (
    <View style={styles.container}>
      <Text>Stepper</Text>
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
