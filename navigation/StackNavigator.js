import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FingerprintScreen from "../screens/FingerprintScreen";
import ScanQRScreen from "../screens/ScanQRScreen";
import FinalPaymentScreen from "../screens/FinalPaymentScreen";
const Stack = createNativeStackNavigator();

export const PaymentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Fingerprint" component={FingerprintScreen} />
      <Stack.Screen name="QR" component={ScanQRScreen} />
      <Stack.Screen name="FinalPayment" component={FinalPaymentScreen} />
    </Stack.Navigator>
  );
};
