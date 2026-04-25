// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjxg9ninrCDvOoJMnrUGLZDKfFPcRXPz4",
  authDomain: "ksr-analytic.firebaseapp.com",
  projectId: "ksr-analytic",
  storageBucket: "ksr-analytic.firebasestorage.app",
  messagingSenderId: "503543140829",
  appId: "1:503543140829:web:1a08a2b706a28d9e7be634",
  measurementId: "G-NGQSLY1KSD"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics only on the client side
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => yes && (analytics = getAnalytics(app)));
}

export { app, analytics };
