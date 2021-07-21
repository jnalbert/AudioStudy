import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import IntroScreen from "../screens/auth/IntroScreen";

import LoginScreen from "../screens/auth/LoginScreen";
import StackHeader from "../shared/StackHeader/StackHeader";
import { backgroundColor } from "../shared/color";
import StackHeaderBackButton from "../shared/StackHeader/StackHeaderBackButton";




const Stack = createStackNavigator();


  

const AuthNavigator: FC = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: backgroundColor, borderBottomColor: backgroundColor, shadowColor: 'transparent' },
          headerBackImage: () => { return <StackHeaderBackButton /> },
          headerBackTitleVisible: false
        }}>
          <Stack.Screen
            name="Intro"
            component={IntroScreen}
            options={{ headerTitle: () => <StackHeader name="Intro" /> }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerTitle: () => <StackHeader name="Login" /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      );
  
};

export default AuthNavigator;
