// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCXKnBsvs0oom9oMhNIFZbg6hpMP9w4fIY",
    authDomain: "final-project-hack.firebaseapp.com",
    projectId: "final-project-hack",
    storageBucket: "final-project-hack.appspot.com",
    messagingSenderId: "816377935272",
    appId: "1:816377935272:web:b3312125e41034b3c5199d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
