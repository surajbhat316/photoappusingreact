// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm-VoJOIBIezbt50pge6dgPdW-tt_Ye6k",
  authDomain: "photoapp-d525b.firebaseapp.com",
  projectId: "photoapp-d525b",
  storageBucket: "photoapp-d525b.appspot.com",
  messagingSenderId: "510261009729",
  appId: "1:510261009729:web:714c9b3ad0ca673d96d5c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);