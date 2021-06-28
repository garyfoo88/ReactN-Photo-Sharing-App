import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
// Optionally import the services that you want to use
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1ZExpAQAAy1AMwOlaRcDGA68Mne4dUoo",
  authDomain: "photo-sharing-app-dcabd.firebaseapp.com",
  projectId: "photo-sharing-app-dcabd",
  storageBucket: "photo-sharing-app-dcabd.appspot.com",
  messagingSenderId: "975914761249",
  appId: "1:975914761249:web:159ce0ff352c5130e4f760",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };