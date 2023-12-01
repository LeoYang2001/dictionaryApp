import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRW9ZMLGYvbTG3jrM2h8aQVW8Ra99vxhw",
  authDomain: "definitor-1796b.firebaseapp.com",
  projectId: "definitor-1796b",
  storageBucket: "definitor-1796b.appspot.com",
  messagingSenderId: "439250020961",
  appId: "1:439250020961:web:79fec751cf0c2c361cd820"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {auth}