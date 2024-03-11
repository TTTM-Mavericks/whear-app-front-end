import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyCsrXIJhyDi-KNRaknEy0KLyesKwBO9c",
    authDomain: "whear-app-1f70d.firebaseapp.com",
    projectId: "whear-app-1f70d",
    storageBucket: "whear-app-1f70d.appspot.com",
    messagingSenderId: "1003056863225",
    appId: "1:1003056863225:web:e6a3c29345a5a825284f28"
};



const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
