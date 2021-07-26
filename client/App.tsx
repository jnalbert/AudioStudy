import React, { FC } from "react";
import AppLoading from 'expo-app-loading';

import { AppWrapperView } from './src/styles/AppStyles';
import { useFonts, Inter_500Medium, Inter_400Regular} from '@expo-google-fonts/inter';

import AuthNavigator from "./src/navigators/AuthNavigator";

  

const App: FC = () => {

  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular

  });

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <AppWrapperView >
        <AuthNavigator />
      </AppWrapperView>
    );
  }
  
};

export default App;
