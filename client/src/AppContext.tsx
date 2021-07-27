import React, {
  FC,
  useEffect,
  useReducer,
  useMemo,
  createContext,
} from "react";
import { View } from "react-native";
import AppLoading from "expo-app-loading";

import { getItemAsync } from "expo-secure-store";
import { LoginFormProps } from "./screens/auth/LoginScreen";
import { SignUpFormProps } from "./screens/auth/SignUpScreen";


export interface AuthTypes {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
}

export interface AuthContextFunctionTypes {
  signIn: (data: LoginFormProps) => Promise<void>;
  signOut: () => void;
  signUp: (data: SignUpFormProps) => Promise<void>;
  authValues: AuthTypes;
}

const defaultContextValue = {
  signIn: async (data: LoginFormProps) => {return;},
  signOut: () => { return },
  signUp: async (data: SignUpFormProps) => {return;},
  authValues: {
    isLoading: true,
    isSignout: false,
    userToken: null
  }
}

export const AuthContext = createContext<AuthContextFunctionTypes>(defaultContextValue);

export const authReducer = (prevState: any, action: any) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
}

  export const useMemoFunction = (dispatch: any, state: any) => ({
    signIn: async (data: LoginFormProps) => {
      // In a production app, we need to send some data (usually username, password) to server and get a token
      // We will also need to handle errors if sign in failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token
      console.log(data)

      dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
    },
    signOut: () => dispatch({ type: "SIGN_OUT" }),

    signUp: async (data: SignUpFormProps) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token
      console.log(data)

      dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
    },
    authValues: state
  })


  export const getTokenAsync = async (dispatch: any) => {
    let userToken = null

    try {
      userToken = await getItemAsync("userToken");
      
    } catch (e) {
      console.log("Token fetching failed");
    }

    dispatch({ type: "RESTORE_TOKEN", token: userToken });
  };


