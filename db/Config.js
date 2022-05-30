// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC97ARWu94jf1bd1Lx9VTdrccDjJF7v77U",
  authDomain: "task1-cs303.firebaseapp.com",
  databaseURL: "https://task1-cs303-default-rtdb.firebaseio.com",
  projectId: "task1-cs303",
  storageBucket: "task1-cs303.appspot.com",
  messagingSenderId: "429475062638",
  appId: "1:429475062638:web:26916532e450f578a9977f",
  measurementId: "G-HMM8KVVYNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };


