// react imports
import { StatusBar } from "expo-status-bar";
import React from "react";

//redux import
import { Provider } from "react-redux";
import { createStore } from "redux";
import userReducer from "./store/reducers";

//react native paper imports
import { Provider as PaperProvider } from "react-native-paper";

//react-navigation imports
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  const store = createStore(userReducer);

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
