import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FinalPaymentScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>{route.params.data}</Text>
    </View>
  );
};

export default FinalPaymentScreen;

const styles = StyleSheet.create({});
