import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import "firebase/storage"
import "firebase/functions"


import Constants from 'expo-constants';



// Initialize Firebase

const firebaseConfig = {
  apiKey: Constants?.manifest?.extra?.apiKey,
  authDomain: Constants?.manifest?.extra?.authDomain,
  projectId: Constants?.manifest?.extra?.projectId,
  storageBucket: Constants?.manifest?.extra?.storageBucket,
  messagingSenderId: Constants?.manifest?.extra?.messagingSenderId,
  appId: Constants?.manifest?.extra?.appId
};


let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}


export const FirebaseAll = Firebase
export const Auth = Firebase?.auth();
export const db = Firebase?.firestore()
export const storage = Firebase?.storage()
// Firebase?.functions().useEmulator("192.168.1.74", 5000);
export const functions = Firebase?.functions();
