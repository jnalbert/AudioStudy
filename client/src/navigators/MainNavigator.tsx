import React, { FC } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioFilesScreen from "../screens/main/AudioFilesScreen";
import CreateAudioFileScreen from "../screens/main/CreateAudioFileScreen";
import SettingsScreen from "../screens/main/SettingsScreen";

// Icons
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Primary, Text500 } from '../shared/color';

const Tab = createBottomTabNavigator();

const MainNavigator: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({color}) => {

          if (route.name === "AudioFiles") {
            return <MaterialIcons name="library-music" size={30} color={color} />
          } else if (route.name === "CreateAudioFile") {
            return <MaterialCommunityIcons name="plus-circle-outline" size={30} color={color} />
          }
          
          return <AntDesign name="user" size={30} color={color} />

        },
      })}
      tabBarOptions={{
        activeTintColor: Primary,
        inactiveTintColor: Text500,
        showLabel: false,
        tabStyle: {paddingTop: 17}
      }}
    >
      <Tab.Screen name="AudioFiles" component={AudioFilesScreen} />
      <Tab.Screen name="CreateAudioFile" component={CreateAudioFileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
