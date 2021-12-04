import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Title, Button } from "react-native-paper";

import { useSelector } from "react-redux";

const FinalPaymentScreen = ({ navigation, route }) => {
  const { username, password, baseUrl } = useSelector((state) => state);
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const confirmPayment = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${baseUrl}/confirm_mobile_payment?code=${
        route.params.code || "a117hcs"
      }&username=${username}&password=${password}`
    );
    if (response.status === 200) setState("Payment Sucessful");
    else setState("Payment Failed, Try Again");

    setIsLoading(false);
  };
  const cancelPayment = async () => {
    setIsLoading(true);
    const response = await fetch(`${baseUrl}/cancel_mobile_payment?username=${username}&password=${password}`);
    if (response.status === 200) {
      setState("Payment Cancelled");
    }
    setIsLoading(false);
  };

  if (state !== null) {
    return (
      <View style={styles.container}>
        <Title>{state}</Title>
      </View>
    );
  }

  return (
    <View>
      <Title style={styles.title}>You are going To Pay from Your Account </Title>
      <View style={styles.margin}>
        <Title>Confirm Payment</Title>
        <View style={styles.btnContainer}>
          <Button
            mode="contained"
            color="green"
            style={styles.btn}
            disabled={isLoading}
            labelStyle={styles.btnLabel}
            onPress={confirmPayment}>
            Yes, pay Amount
          </Button>
          <Button
            mode="contained"
            disabled={isLoading}
            color="red"
            style={styles.btn}
            labelStyle={styles.btnLabel}
            onPress={cancelPayment}>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
