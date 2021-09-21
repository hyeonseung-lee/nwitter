// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import * as auth from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGIN_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// authentication
export const authService = auth.getAuth();
export const firebaseAuth = auth;
export const firebaseInstance = firebase;

// firestore to
export const dbService = getFirestore();
