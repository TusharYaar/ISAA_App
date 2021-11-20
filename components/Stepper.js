import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Title, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";

import { useNavigation } from "@react-navigation/native";

import { logout } from "../store/actions";

// import Icon from";

const data = [
  {
    id: 0,
    name: "Login",
    icon: "person-outline",
  },
  {
    id: 1,
    name: "Fingerprint",
    icon: "fingerprint",
  },
  {
    id: 2,
    name: "Scan QR",
    icon: "qr-code-scanner",
  },
  {
    id: 3,
    name: "Approve Payment",
    icon: "approval",
  },
];
const Stepper = () => {
  const { currentStep } = useSelector((state) => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    await SecureStore.deleteItemAsync("accountNumber");
    await SecureStore.deleteItemAsync("password");
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        {data.map((item) => {
          return (
            <View
              key={item.id}
              style={[
                styles.step,
                currentStep == item.id ? styles.currentStep : null,
                currentStep > item.id ? styles.stepDone : null,
              ]}>
              <MaterialIcons name={item.icon} size={22} color={currentStep > item.id ? "white" : "black"} />
            </View>
          );
        })}
      </View>
      <Title>{data[currentStep].name}</Title>
      <Button icon="logout-variant" onPress={logoutUser} style={styles.btn}>
        logout
      </Button>
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#e6e6e6",
  },
  stepContainer: {
    width: "100%",
    height: 75,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  step: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#C2C2C2",
    justifyContent: "center",
    alignItems: "center",
  },
  stepDone: {
    backgroundColor: "#00C853",
  },
  currentStep: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 7,
    borderColor: "#6200EE",
  },
  btn: {
    width: "30%",
    alignSelf: "flex-start",
  },
});
