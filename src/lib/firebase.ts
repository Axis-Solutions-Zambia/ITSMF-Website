import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpODlHlm-J7TZYsP3_kCY129waP9ymKcw",
  authDomain: "itsmf-website.firebaseapp.com",
  projectId: "itsmf-website",
  storageBucket: "itsmf-website.firebasestorage.app",
  messagingSenderId: "57963893926",
  appId: "1:57963893926:web:83f0f60a90c84390481067",
  measurementId: "G-K2327KRZFW"
};

// Prevent duplicate app initialisation in dev with HMR
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
