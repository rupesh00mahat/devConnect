// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZyQkRyWqsAonMDtnGtyPwYAd-k_WLoIU",
  authDomain: "devconnect-e5528.firebaseapp.com",
  projectId: "devconnect-e5528",
  storageBucket: "devconnect-e5528.firebasestorage.app",
  messagingSenderId: "769290352750",
  appId: "1:769290352750:web:9b6f3638b11e79987e0e7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;