import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../telas/Home";
import Sobre from "../telas/Sobre";

export type DrawerParamList = {
  Home: undefined;
  Sobre: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function AppDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#941a1a' },  // header dark
          headerTintColor: '#fff',                      
          drawerStyle: { backgroundColor: '#1a1a1a' },  
          drawerActiveTintColor: '#941a1a',             
          drawerInactiveTintColor: '#fff',             
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Sobre" component={Sobre} />
      </Drawer.Navigator>
    </NavigationContainer>

  );
}
