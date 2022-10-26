// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwykY__1n6WtYlythW0kUvFmV02RvoF0c",
  authDomain: "social-media-project-78e85.firebaseapp.com",
  projectId: "social-media-project-78e85",
  storageBucket: "social-media-project-78e85.appspot.com",
  messagingSenderId: "959430485275",
  appId: "1:959430485275:web:9de0f57a58e93ca6a79fbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)