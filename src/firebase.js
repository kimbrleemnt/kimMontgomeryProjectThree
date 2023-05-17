// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj4S8Te_VjIRAnRXy9VokXEsUMe12vdyo",
  authDomain: "derby-wheel-selector.firebaseapp.com",
  databaseURL: "https://derby-wheel-selector-default-rtdb.firebaseio.com",
  projectId: "derby-wheel-selector",
  storageBucket: "derby-wheel-selector.appspot.com",
  messagingSenderId: "1087470499716",
  appId: "1:1087470499716:web:59f482f9bab08050728fd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;