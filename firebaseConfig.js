/**
 * @file firebase.js
 * @description
 * Firebase initialization and configuration for the Shopping App.
 * 
 * This module initializes Firebase and exports configured instances
 * of Firebase App, Firestore, and Firebase Authentication.
 * 
 * Authentication persistence is handled differently depending on the platform:
 * - Web: browser local persistence
 * - iOS / Android: React Native AsyncStorage persistence
 */

import {
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { initializeApp,  } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";

/**
 * Firebase configuration object.
 *
 * @type {Object}
 * @property {string} apiKey Firebase API key
 * @property {string} authDomain Firebase authentication domain
 * @property {string} projectId Firebase project ID
 * @property {string} storageBucket Firebase storage bucket
 * @property {string} messagingSenderId Firebase messaging sender ID
 * @property {string} appId Firebase app ID
 */

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBihgTR-xnxRYcW6TEy9IdpReCX_7AstBg",
  authDomain: "agas-shopping-list-demo.firebaseapp.com",
  projectId: "agas-shopping-list-demo",
  storageBucket: "agas-shopping-list-demo.firebasestorage.app",
  messagingSenderId: "326283031177",
  appId: "1:326283031177:web:614a2b367bbe8f39294c58"
};


/**
 * Initialized Firebase application instance.
 *
 * @type {import('firebase/app').FirebaseApp}
 */

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

/**
 * Firestore database instance used by the app.
 *
 * @type {import('firebase/firestore').Firestore}
 */

const db = getFirestore(app);

/**
 * Firebase Authentication instance.
 *
 * Uses platform-specific persistence:
 * - Web: browserLocalPersistence
 * - iOS / Android: React Native AsyncStorage
 *
 * @type {import('firebase/auth').Auth}
 */

let auth;

if (Platform.OS === "web") {
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
  });
}
else {
  auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)  
}); 
}


export { app, db, auth };
