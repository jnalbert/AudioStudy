import React, { FC } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import StackHeader from "../shared/StackHeader/StackHeader";
import { backgroundColor } from "../shared/color";
import StackHeaderBackButton from "../shared/StackHeader/StackHeaderBackButton";
import AudioFilesScreen from '../screens/main/AudioFilesScreen';
import AudioFileListenScreen from '../screens/main/AudioFileListenScreen';

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
        name="AudioFileListen"
        component={AudioFileListenScreen}
        options={{ headerTitle: () => <StackHeader name="" />, headerShown: true }}
      />

    
     

    </Stack.Navigator>
  )
}

export default AudioFilesNavigator