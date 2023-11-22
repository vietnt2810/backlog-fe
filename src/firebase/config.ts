// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF7eMq9CH57VgO_UUVevDioVXHoF9bxak",
  authDomain: "backlog-storage.firebaseapp.com",
  projectId: "backlog-storage",
  storageBucket: "backlog-storage.appspot.com",
  messagingSenderId: "172595151957",
  appId: "1:172595151957:web:86d22453eaaf141fc640dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
