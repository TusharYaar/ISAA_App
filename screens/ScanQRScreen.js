import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { Button, Title } from "react-native-paper";

const ScanQRScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type = "QR", data = { accountNumber: 123123, amount: 34234 } }) => {
    setScanned(true);
    navigation.replace("FinalPayment", {
      type: type,
      data: data,
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
        <Button onPress={handleBarCodeScanned} mode="contained">
          Move Forward
        </Button>
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
