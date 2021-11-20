import React, { useState, useEffect, useCallback } from "react";

import { StyleSheet, Alert, View } from "react-native";
import { Button, Headline, Subheading, TextInput, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import * as SecureStore from "expo-secure-store";

import * as Crypto from "expo-crypto";
import { useDispatch } from "react-redux";

import { loginUser } from "../store/actions";

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    accountNumber: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleServerVerification = useCallback(() => {
    const { accountNumber, password } = details;
    const data = { accountNumber, password };
  }, [details]);

  useEffect(() => {
    (async () => {
      const accountNumber = await SecureStore.getItemAsync("accountNumber");
      const password = await SecureStore.getItemAsync("password");
      if (accountNumber && password) {
        const encryptedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
        setDetails({ accountNumber, password });
        dispatch(loginUser({ accountNumber, password, encryptedPassword }));
        navigation.reset({
          index: 0,
          routes: [{ name: "Fingerprint" }],
        });
      } else setIsLoading(false);
    })();
  }, [SecureStore]);

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
      const { accountNumber, password } = details;
      const encryptedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
      // ! Enable Back
      // const response = await fetch(
      //   `https://mockback.herokuapp.com/6188a1b800f84800157ac2ab/r/login`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       accountNumber,
      //       encryptedPassword,
      //     }),
      //   }
      // );
      // const responseJson = await response.json();
      // if (response.status === 200 ) {
      if (true) {
        await SecureStore.setItemAsync("accountNumber", accountNumber);
        await SecureStore.setItemAsync("password", password);
        dispatch(loginUser({ accountNumber, password, encryptedPassword }));
        navigation.navigate("Fingerprint");
      } else throw new Error(responseJson.message);
    } catch (error) {
      Alert.alert("Error", error.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Headline>Login</Headline>
      <Title>ISAA Project</Title>
      <Subheading style={styles.subheading}>Account Number</Subheading>
      <TextInput
        value={details.accountNumber}
        onChangeText={(text) => handleDetailsChange("accountNumber", text)}
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
      <Button mode="contained" style={styles.button} disabled={isLoading} onPress={handleSubmit}>
        Login
      </Button>
    </View>
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
