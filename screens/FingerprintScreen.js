import React, { useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

import * as LocalAuthentication from "expo-local-authentication";

const FingerprintScreen = ({ navigation }) => {
  const authenticate = useCallback(async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync();
      if (success) {
        Alert.alert("Authenticated!", "Successfully authenticated!", [
          {
            text: "OK",
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: "QR" }],
              }),
          },
        ]);
      } else {
        Alert.alert("Authentication failed");
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }, [LocalAuthentication]);
  useEffect(() => {
    authenticate();
  }, [authenticate]);
  return (
    <View>
      <Text>Verify Your Fingerprint</Text>
      <Button onPress={authenticate} title="Verify Your Fingerprint" />
    </View>
  );
};

export default FingerprintScreen;

const styles = StyleSheet.create({});
