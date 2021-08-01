import React, { FC } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import StackHeader from "../shared/StackHeader/StackHeader";
import { backgroundColor } from "../shared/color";
import StackHeaderBackButton from "../shared/StackHeader/StackHeaderBackButton";
import CreateAudioFileScreen from '../screens/main/CreateAudioFileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';

const Stack = createStackNavigator();

const SettingsNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: backgroundColor, borderBottomColor: backgroundColor, shadowColor: 'transparent' },
      headerBackImage: () => { return <StackHeaderBackButton /> },
      headerBackTitleVisible: false
    }}>
       

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: () => <StackHeader name="Settings" />, headerShown: true }}
      />    
    

    </Stack.Navigator>
  )
}

export default SettingsNavigator;

