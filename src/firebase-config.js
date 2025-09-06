// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDpiUKrQjpkkO546uXnddz7uUn-oIUUKN0",
    authDomain: "skilzr.firebaseapp.com",
    projectId: "skilzr",
    storageBucket: "skilzr.firebasestorage.app",
    messagingSenderId: "514623485174",
    appId: "1:514623485174:web:6a8abfdbf3d6ea45be68d7",
    measurementId: "G-CMERVV8DGK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
