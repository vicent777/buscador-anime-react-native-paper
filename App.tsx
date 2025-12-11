import React from "react";
import { Provider as PaperProvider, MD3LightTheme } from "react-native-paper";
import AppDrawer from "./src/navigation/AppDrawer";
import 'react-native-gesture-handler';
import 'react-native-reanimated';


const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: "#FAFAFA",
    surface: "#FFFFFF",
  },
};

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <AppDrawer />
    </PaperProvider>
  );
}
