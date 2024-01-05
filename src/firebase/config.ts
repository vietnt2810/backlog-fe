// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjeCEsIEGXpuxAmJGw8iMp3ursxCpQ5Qs",
  authDomain: "backlog-chat.firebaseapp.com",
  projectId: "backlog-chat",
  storageBucket: "backlog-chat.appspot.com",
  messagingSenderId: "355291689429",
  appId: "1:355291689429:web:b3c13b48cd91b25ce2cd5c",
  measurementId: "G-PPQNMRLT5T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const database = getFirestore(app);
