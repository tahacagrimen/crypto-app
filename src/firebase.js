// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "crypto-wallet-17411.firebaseapp.com",
  projectId: "crypto-wallet-17411",
  storageBucket: "crypto-wallet-17411.appspot.com",
  messagingSenderId: "323865541703",
  appId: "1:323865541703:web:6935464b8544be46454562",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();
