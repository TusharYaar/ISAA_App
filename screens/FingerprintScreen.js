import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Button, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setStep } from "../store/actions";
import * as LocalAuthentication from "expo-local-authentication";

const FingerprintScreen = ({ navigation }) => {
  const [canAuthenticate, setCanAuthenticate] = useState(null);
  const dispatch = useDispatch();
  const authenticate = useCallback(async () => {
    try {
      const hasAccess = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (hasAccess && isEnrolled) {
        setCanAuthenticate(true);
        const { success } = await LocalAuthentication.authenticateAsync();
        if (success) {
          dispatch(setStep(2));
          navigation.reset({
            index: 0,
            routes: [{ name: "QR" }],
          });
        } else Alert.alert("Authentication Failed!", "Please try again");
      } else setCanAuthenticate(false);
    } catch (err) {}
  }, [LocalAuthentication]);
  useEffect(() => {
    authenticate();
  }, [authenticate]);

  if (canAuthenticate == true) {
    return (
      <View>
        <Title style={styles.title}>Verify Your Fingerprint</Title>
        <Button onPress={authenticate} mode="contained">
          Verify Your Fingerprint
        </Button>
      </View>
    );
  } else if (canAuthenticate == false) {
    return (
      <Title style={styles.title}>
        The device do not have a Fingerprint Scanner, or does not have a Fingerprint stored
      </Title>
    );
  } else {
    return (
      <View>
        <Title>Loading...</Title>
      </View>
    );
  }
};

export default FingerprintScreen;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
