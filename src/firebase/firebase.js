import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4Bw1yoGd3gKOsxXWQrVhJramt859SwSY",
  authDomain: "taskify-11ec9.firebaseapp.com",
  projectId: "taskify-11ec9",
  storageBucket: "taskify-11ec9.firebasestorage.app",
  messagingSenderId: "379337476486",
  appId: "1:379337476486:web:e8842301bc877f84f24407"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);