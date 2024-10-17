import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8zpqRz2abWbNIUMPv1YkwLAyP5LAtf1w",
  authDomain: "ab-foodweb.firebaseapp.com",
  projectId: "ab-foodweb",
  storageBucket: "ab-foodweb.appspot.com",
  messagingSenderId: "969682643488",
  appId: "1:969682643488:web:aa524024f1b34e6448ea45"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()