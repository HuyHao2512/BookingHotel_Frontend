// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
export const createUserWithEmail = (auth, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signInWithEmailAndPassword = (auth, email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export { auth, signInWithGoogle, signInWithFacebook };
