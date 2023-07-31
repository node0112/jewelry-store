// Import the functions you need from the SDKs you need
import {initializeApp}  from "firebase/app";
import {getAnalytics}  from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBAJ_hTRHlD8E9udCdDJtIXZOkwO-zGbR4",
  authDomain: "earhart-jewelry.firebaseapp.com",
  projectId: "earhart-jewelry",
  storageBucket: "earhart-jewelry.appspot.com",
  messagingSenderId: "676588992548",
  appId: "1:676588992548:web:3d0e0e94a69f7fe20e40b1",
  measurementId: "G-T1D3ZNGP11"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//setting up required functions 
export const db = getFirestore(app)