import React, { useState, useEffect, useCallback } from "react";

import { StyleSheet, Alert, View } from "react-native";
import { Button, Headline, Subheading, TextInput, Title } from "react-native-paper";

import * as SecureStore from "expo-secure-store";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../store/actions";

const LoginScreen = ({ navigation }) => {
  const { baseUrl } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    username: "yash",
    password: "1234",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleServerVerification = useCallback(async () => {
    const { username, password } = details;
    try {
      const response = await fetch(`${baseUrl}/mobile_login?username=${username}&password=${password}`);
      if (response.status === 200) return true;
      else throw new Error("Invalid credentials");
    } catch (error) {
      Alert.alert("Error", error.message);
      return false;
    }
  }, [details]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const username = await SecureStore.getItemAsync("username");
      const password = await SecureStore.getItemAsync("password");
      if (username && password) {
        const response = await handleServerVerification();
        if (response) {
          dispatch(loginUser({ username, password, currentStep: 1 }));
          navigation.reset({
            index: 0,
            routes: [{ name: "Fingerprint" }],
          });
        }
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
    const { username, password } = details;
    const response = await handleServerVerification();
    if (response) {
      await SecureStore.setItemAsync("username", username);
      await SecureStore.setItemAsync("password", password);
      dispatch(loginUser({ username, password, currentStep: 1 }));
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Fingerprint" }],
      });
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
