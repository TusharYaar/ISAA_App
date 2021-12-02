import React, { useState, useEffect, useCallback } from "react";

import { StyleSheet, Alert, View } from "react-native";
import { Button, Headline, Subheading, TextInput, Title } from "react-native-paper";

import * as SecureStore from "expo-secure-store";

import * as Crypto from "expo-crypto";
import { useDispatch } from "react-redux";

import { loginUser } from "../store/actions";

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    username: "yash",
    password: "1234",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleServerVerification = useCallback(() => {
    const { username, password } = details;
    const data = { username, password };
  }, [details]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const username = await SecureStore.getItemAsync("username");
      const password = await SecureStore.getItemAsync("password");
      if (username && password) {
        const encryptedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
        setDetails({ username, password });
        dispatch(loginUser({ username, password, encryptedPassword, currentStep: 1 }));
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
      const { username, password } = details;
      const encryptedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
      // ! Enable Back
      let formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);
      const response = await fetch(
        `https://c54f-49-36-37-140.ngrok.io/mobile_login?username=${username}&password=${password}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      if (response.status === 200) {
        // if (true) {
        await SecureStore.setItemAsync("username", username);
        await SecureStore.setItemAsync("password", password);
        dispatch(loginUser({ username, password, encryptedPassword, currentStep: 1 }));
        navigation.navigate("Fingerprint");
      } else throw new Error("Invalid Credentials");
    } catch (error) {
      // Alert.alert("Error", error.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Headline>Login</Headline>
      <Title>ISAA Project</Title>
      <Subheading style={styles.subheading}>User Name</Subheading>
      <TextInput
        value={details.username}
        onChangeText={(text) => handleDetailsChange("username", text)}
        label="User Name"
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
    marginTop: 20,
  },
  button: {
    marginTop: 30,
  },
});
