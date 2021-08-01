import React, { FC } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import StackHeader from "../shared/StackHeader/StackHeader";
import { backgroundColor } from "../shared/color";
import StackHeaderBackButton from "../shared/StackHeader/StackHeaderBackButton";
import CreateAudioFileScreen from '../screens/main/CreateAudioFileScreen';

const Stack = createStackNavigator();

const CreateAudioFileNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: backgroundColor, borderBottomColor: backgroundColor, shadowColor: 'transparent' },
      headerBackImage: () => { return <StackHeaderBackButton /> },
      headerBackTitleVisible: false
    }}>
       

      <Stack.Screen
        name="AudioFiles"
        component={CreateAudioFileScreen}
        options={{ headerTitle: () => <StackHeader name="Create Audio File" />, headerShown: true }}
      />    
    

    </Stack.Navigator>
  )
}

export default CreateAudioFileNavigator

