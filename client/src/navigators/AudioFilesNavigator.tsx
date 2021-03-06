import React, { FC } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import StackHeader from "../shared/StackHeader/StackHeader";
import { backgroundColor } from "../shared/color";
import StackHeaderBackButton from "../shared/StackHeader/StackHeaderBackButton";
import AudioFilesScreen from '../screens/main/AudioFilesScreen';
import AudioFileListenScreen from '../screens/main/AudioFileListenScreen';
import AudioFileListenNavigator from './AudioFileListenNavigator';

const Stack = createStackNavigator();

const AudioFilesNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: backgroundColor, borderBottomColor: backgroundColor, shadowColor: 'transparent' },
      headerBackImage: () => { return <StackHeaderBackButton /> },
      headerBackTitleVisible: false
    }}>
       

      <Stack.Screen
        name="AudioFiles"
        component={AudioFilesScreen}
        options={{ headerTitle: () => <StackHeader name="Audio Files" />, headerShown: true }}
      />

      <Stack.Screen
        name="AudioFileListenNav"
        component={AudioFileListenNavigator}
        options={{ headerShown: false }}
      />

  
    
     

    </Stack.Navigator>
  )
}

export default AudioFilesNavigator