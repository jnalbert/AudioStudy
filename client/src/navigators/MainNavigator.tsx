import React, { FC } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/main/SettingsScreen";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Icons
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Primary, Text500 } from '../shared/color';
import AudioFilesNavigator from "./AudioFilesNavigator";
import CreateAudioFileNavigator from "./CreateAudioFileNavigator";
import SettingsNavigator from "./SettingsNavigator";

const displayTabs = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (routeName === "AudioFileListen") return false;

  return true;
}



const Tab = createBottomTabNavigator();

const MainNavigator: FC = () => {


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({color}) => {

          if (route.name === "AudioFiles") {
            return <MaterialIcons name="library-music" size={28} color={color} />
          } else if (route.name === "CreateAudioFile") {
            return <Entypo name="circle-with-plus" size={28} color={color} />
          }
          
          return <FontAwesome5 name="user-alt" size={28} color={color} />

        },
        tabBarVisible: displayTabs(route)
      })}
      tabBarOptions={{
        activeTintColor: Primary,
        inactiveTintColor: Text500,
        showLabel: false,
        tabStyle: {paddingTop: 17}
      }}
    >
      <Tab.Screen name="AudioFiles" component={AudioFilesNavigator} />
      <Tab.Screen name="CreateAudioFile" component={CreateAudioFileNavigator} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
