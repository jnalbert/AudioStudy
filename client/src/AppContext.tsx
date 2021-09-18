import React, {
  createContext,
} from "react";
import { View } from "react-native";




import { LoginFormProps } from "./screens/auth/LoginScreen";
import { SignUpFormProps } from "./screens/auth/SignUpScreen";
import { Auth } from '../config/firebase';
import { addNewAccountToDB } from "../firebase/FirestoreFunctions";
import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";


export interface AuthTypes {
  isLoading: boolean;
  isSignout: boolean;
  userUuid: string | null;
}

export interface AuthContextFunctionTypes {
  signIn: (data: LoginFormProps) => Promise<string | null>;
  signOut: () => void;
  signUp: (data: SignUpFormProps) => Promise<string | null>;
  authValues: AuthTypes;
}

const defaultContextValue = {
  signIn: async (data: LoginFormProps) => {return null;},
  signOut: () => { return },
  signUp: async (data: SignUpFormProps) => {return null;},
  authValues: {
    isLoading: true,
    isSignout: false,
    userUuid: null
  }
}

export enum actions {
  restoreToken = "RESTORE_TOKEN",
  signIn = "SIGN_IN",
  signOut = "SIGN_OUT"
}

interface actionType {
  type: actions,
  token: string | null
}

export const AuthContext = createContext<AuthContextFunctionTypes>(defaultContextValue);

export const authReducer = (prevState: AuthTypes, action: actionType) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userUuid: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userUuid: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userUuid: null,
      };
    default:
      return {
        ...prevState
      }
  }
}

  export const useMemoFunction = (dispatch: any, state: any) => ({
    signIn: async (data: LoginFormProps) => {
      // In a production app, we need to send some data (usually username, password) to server and get a token
      // We will also need to handle errors if sign in failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token
      console.log(data)

      try {
        const userResponse = await Auth?.signInWithEmailAndPassword(data.email, data.password)
        // console.log(userResponse?.user?.metadata.creationTime)


        // console.log(userResponse?.user?.uid, "uuid logit" )
        dispatch({ type: "SIGN_IN", token: userResponse?.user?.uid });
      } catch (error: any) {
        console.log(error.code)
        if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
          return "Email or Password is incorrect"
        }
        return null;
      }

      return null;
      
    },
    signOut: () => {
      dispatch({ type: "SIGN_OUT" })
      try {
        Auth?.signOut()
      } catch (error) {
        console.log(error)
      }
    },

    signUp: async (data: SignUpFormProps) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token
      console.log(data)

      try {
        const userResponse = await Auth?.createUserWithEmailAndPassword(data.email, data.password)

        // console.log(userResponse)
        // console.log(new Date(userResponse?.user?.metadata?.creationTime))

        const creationDate = userResponse?.user?.metadata?.creationTime

        const newUserObject = {
          name: data.name,
          email: data.email,
          dateJoined: creationDate ? new Date(creationDate).toISOString() : "",
          totalAudioFiles: 0,
          totalAudioFileLengthSeconds: 0,
          uuid: userResponse?.user?.uid || "",
        }

        addNewAccountToDB(newUserObject)

    
        dispatch({ type: "SIGN_IN", token: userResponse?.user?.uid });
      } catch (error: any) {
        console.log(error.code)
        if (error.code === "auth/email-already-in-use" ) {
          return "This email is already associated with an account"
        }
        return null;
        
      }
      return null;

    },
    authValues: state
  })


export const getTokenAsync = async (dispatch: any) => {

  try {
      Auth?.onAuthStateChanged(async(user) => {
        let userUuid = null;
        if (user) {
          userUuid = user.uid
          await _storeUuid(userUuid);
        }

        // Turn this off when not in dev mode
        // userUuid = "dev"

        console.log(userUuid, "uuid")
        
        await dispatch({ type: "RESTORE_TOKEN", token: userUuid });
       
      });
    } catch (e) {
      console.log(e);
      
    }

    // Turn this off when not in dev mode

    
  // userUuid = "dev"
    
};
  
const _storeUuid = async (uuid: string) => {
  try {
    await setItemAsync('firebaseUserUuid', uuid);
  } catch (error) {
    console.log(error)
  }
}

export const _getStoredUuid = async () => {
  try {
    const value = await getItemAsync('firebaseUserUuid');
    if (value !== null) {
      // We have data!!
      return value;
    }
  } catch (error) {
    console.log(error)
  }
}

export const _deleteStoredUuid = async () => {
  await deleteItemAsync('firebaseUserUuid')
}


