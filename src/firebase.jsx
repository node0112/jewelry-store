// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);