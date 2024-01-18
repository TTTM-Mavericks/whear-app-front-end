// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage, ref } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCyCsrXIJhyDi-KNRaknEy0KLyesKwBO9c",
//     authDomain: "whear-app-1f70d.firebaseapp.com",
//     projectId: "whear-app-1f70d",
//     storageBucket: "whear-app-1f70d.appspot.com",
//     messagingSenderId: "1003056863225",
//     appId: "1:1003056863225:web:e6a3c29345a5a825284f28"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Create a root reference
// export const storage = getStorage();

// // Create a reference to 'mountains.jpg'
// const mountainsRef = ref(storage, 'mountains.jpg');

// // Create a reference to 'images/mountains.jpg'
// const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// // While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name;           // true
// mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 