
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwOyYDglok0G7sjRP-ILHszbJgzNhzcgo",
    authDomain: "edutrack-8eb79.firebaseapp.com",
    projectId: "edutrack-8eb79",
    storageBucket: "edutrack-8eb79.firebasestorage.app",
    messagingSenderId: "404911272503",
    appId: "1:404911272503:web:aeae7d598e4cb8c52905b2",
    measurementId: "G-VJDCR1R3LS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const _analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };