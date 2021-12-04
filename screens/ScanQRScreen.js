import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { Button, Title } from "react-native-paper";

import { useDispatch } from "react-redux";
import { setStep } from "../store/actions";

const ScanQRScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type = "QR", data }) => {
    setScanned(true);
    dispatch(setStep(3));
    navigation.replace("FinalPayment", {
      type: type,
      code: data,
    });
  };

  if (hasPermission === null) {
    return <Title style={styles.title}>Requesting for camera permission</Title>;
  }
  if (hasPermission === false) {
    return <Title style={styles.title}>No access to camera</Title>;
  }

  if (hasPermission && scanned) {
    return (
      <View style={styles.container}>
        {/* <Button onPress={handleBarCodeScanned}> Move </Button> */}
        <Button onPress={() => setScanned(false)} mode="contained">
          Scan QR
        </Button>
      </View>
    );
  }
  if (hasPermission && !scanned) {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    );
  }
};

export default ScanQRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
  },
});
