import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { Title } from "react-native-paper";

const ScanQRScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.replace("FinalPayment", {
      type: type,
      data: data,
    });
  };

  if (hasPermission === null) {
    return <Title>Requesting for camera permission</Title>;
  }
  if (hasPermission === false) {
    return <Title>No access to camera</Title>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Text>{scanned ? "True" : "False"}</Text>
      {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
    </View>
  );
};

export default ScanQRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
