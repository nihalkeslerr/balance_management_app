// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAg-hARQZj-dipRK1gDUNr-yg3gP3lwUk",
  authDomain: "balance-management-app.firebaseapp.com",
  projectId: "balance-management-app",
  storageBucket: "balance-management-app.firebasestorage.app",
  messagingSenderId: "597272698885",
  appId: "1:597272698885:web:efbfd9e2eb85e72a73fc6c",
  measurementId: "G-LWFLS42LE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, auth, db};