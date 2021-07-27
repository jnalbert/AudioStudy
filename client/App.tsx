import React, { FC, useEffect,
  useReducer,
  useMemo, } from "react";
import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";

import AuthNavigator from "./src/navigators/AuthNavigator";
import { AppWrapperView } from "./src/styles/AppStyles";
import { AuthContext, authReducer, getTokenAsync, AuthTypes, useMemoFunction, AuthContextFunctionTypes } from "./src/AppContext";
import { View, Text } from "react-native";

const App: FC<any> = ({ navigation }) => {
  const [state, dispatch]: [AuthTypes, React.Dispatch<any>] = useReducer(
    authReducer,
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
  });

  useEffect(() => {
    getTokenAsync(dispatch);
  }, []);

  const authContext = useMemo<AuthContextFunctionTypes>(() => useMemoFunction(dispatch, state), []);

  
  return (
    <AuthContext.Provider value={authContext}>
      {(!fontsLoaded || state.isLoading) ? (
        <AppLoading />
      ) : (
        <AppWrapperView>
          {state?.userToken === null ? (
            <AuthNavigator />
          ) : (
            <View>
              <Text>Home Screen</Text>
            </View>
          )}
        </AppWrapperView>
      )}
    </AuthContext.Provider>
  );
};

export default App;
