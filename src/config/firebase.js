// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { initializeFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMWj6CrcUgfCIv_OFMz9MXIOHx8WUi_bM",
  authDomain: "midas-9ab16.firebaseapp.com",
  projectId: "midas-9ab16",
  storageBucket: "midas-9ab16.firebasestorage.app",
  messagingSenderId: "871703398050",
  appId: "1:871703398050:web:c36e0b2724140a7bdc79fb",
  measurementId: "G-XFG99FY8JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export { auth, createUserWithEmailAndPassword, db, doc, setDoc, signInWithEmailAndPassword };