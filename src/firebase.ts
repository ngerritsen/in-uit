import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAb4iC7S3d4ijgtxvZRcuz41m2aK1w--V8",
  authDomain: "income-expenses-f84a7.firebaseapp.com",
  databaseURL: "https://income-expenses-f84a7.firebaseio.com",
  projectId: "income-expenses-f84a7",
  storageBucket: "income-expenses-f84a7.appspot.com",
  messagingSenderId: "173193217697",
  appId: "1:173193217697:web:927eb3e8cb57ec395152e0",
};

firebase.initializeApp(firebaseConfig);
