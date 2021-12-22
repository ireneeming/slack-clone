import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPKh4bXo_GLhsvAQKiOkWFcW7lTo8ZzGA",
  authDomain: "slack-clone-ee052.firebaseapp.com",
  projectId: "slack-clone-ee052",
  storageBucket: "slack-clone-ee052.appspot.com",
  messagingSenderId: "576326212041",
  appId: "1:576326212041:web:5c0b03adc4823a9e9c3018"
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const firestore = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export{auth, db, provider, firestore};
