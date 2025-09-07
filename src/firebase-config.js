// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDpiUKrQjpkkO546uXnddz7uUn-oIUUKN0",
    authDomain: "skilzr.firebaseapp.com",
    projectId: "skilzr",
    storageBucket: "skilzr.firebasestorage.app",
    messagingSenderId: "514623485174",
    appId: "1:514623485174:web:6a8abfdbf3d6ea45be68d7",
    measurementId: "G-CMERVV8DGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
