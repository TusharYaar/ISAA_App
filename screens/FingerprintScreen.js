import React, { useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

import * as LocalAuthentication from "expo-local-authentication";

const FingerprintScreen = ({ navigation, route }) => {
  const authenticate = useCallback(async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync();
      if (success) {
        Alert.alert("Authenticated!", "Successfully authenticated!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("QR"),
          },
        ]);
      } else {
        Alert.alert("Authentication failed");
      }
      // await LocalAuthentication.authenticateAsync();
    } catch (e) {
      Alert.alert("Error", e.message);
      console.log(e);
    }
  }, [LocalAuthentication]);
  useEffect(() => {
    authenticate();
  }, []);
  return (
    <View>
      <Text>Verify Your Fingerprint</Text>
    </View>
  );
};

export default FingerprintScreen;

const styles = StyleSheet.create({});
