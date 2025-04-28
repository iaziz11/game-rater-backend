import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "video-game-proje.firebaseapp.com",
  projectId: "video-game-proje",
  storageBucket: "video-game-proje.firebasestorage.app",
  messagingSenderId: "1075517470636",
  appId: "1:1075517470636:web:5c9cf54e8491a4a3dc6c09",
  measurementId: "G-3SNV61Y3SF",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export { db };
