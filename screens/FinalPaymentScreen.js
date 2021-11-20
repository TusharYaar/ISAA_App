import React from "react";
import { StyleSheet, View } from "react-native";

import { Title, Button } from "react-native-paper";

const FinalPaymentScreen = ({ navigation, route }) => {
  const confirmPayment = () => {};
  const cancelPayment = () => {};
  return (
    <View>
      <Title style={styles.title}>You are going To Pay Amount to Guys from Your Account </Title>
      <View style={styles.margin}>
        <Title>Confirm Payment</Title>
        <View style={styles.btnContainer}>
          <Button
            mode="contained"
            color="green"
            style={styles.btn}
            labelStyle={styles.btnLabel}
            onPress={confirmPayment}>
            Yes, pay Amount
          </Button>
          <Button mode="contained" color="red" style={styles.btn} labelStyle={styles.btnLabel} onPress={cancelPayment}>
            No, Cancel
          </Button>
        </View>
      </View>
    </View>
  );
};

export default FinalPaymentScreen;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  margin: {
    marginTop: 40,
  },
  btnContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    width: "45%",
    fontSize: 10,
  },
  btnLabel: {
    fontSize: 12,
  },
});
