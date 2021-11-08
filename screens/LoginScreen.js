import React, { useState } from "react";

import { StyleSheet, Alert } from "react-native";
import {
  Button,
  Headline,
  Subheading,
  TextInput,
  Title,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Crypto from "expo-crypto";
import { useDispatch } from "react-redux";

import { loginUser } from "../store/actions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    accountNo: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleDetailsChange = (key, value) => {
    setDetails((details) => {
      return { ...details, [key]: value };
    });
  };

  const togglePasswordVisible = () => {
    setPasswordVisible((current) => !current);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { accountNo, password } = details;
      const encryptedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
      const response = await fetch(
        `https://mockback.herokuapp.com/6188a1b800f84800157ac2ab/r/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountNo,
            encryptedPassword,
          }),
        }
      );
      const responseJson = await response.json();
      if (response.status === 200) {
        dispatch(loginUser({ accountNo, password, encryptedPassword }));
      } else throw new Error(responseJson.message);
    } catch (error) {
      Alert.alert("Error", error.message);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Headline>Login</Headline>
      <Title>ISAA Project</Title>
      <Subheading style={styles.subheading}>Account Number</Subheading>
      <TextInput
        value={details.accountNo}
        onChangeText={(text) => handleDetailsChange("accountNo", text)}
        label="Account Number"
        disabled={isLoading}
      />
      <Subheading style={styles.subheading}>Password</Subheading>
      <TextInput
        value={details.password}
        onChangeText={(text) => handleDetailsChange("password", text)}
        secureTextEntry={passwordVisible}
        label="Password"
        disabled={isLoading}
        right={<TextInput.Icon name="eye" onPress={togglePasswordVisible} />}
      />
      <Button
        mode="contained"
        style={styles.button}
        disabled={isLoading}
        onPress={handleSubmit}
      >
        Login
      </Button>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  subheading: {
    marginTop: 30,
  },
  button: {
    marginTop: 30,
  },
});
