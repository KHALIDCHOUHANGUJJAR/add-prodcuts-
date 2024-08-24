import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbNZb6KtNfj9EkQ_JJmiqsDREWCHy8_BU",
  authDomain: "minihackthone-8e283.firebaseapp.com",
  projectId: "minihackthone-8e283",
  storageBucket: "minihackthone-8e283.appspot.com",
  messagingSenderId: "880841340414",
  appId: "1:880841340414:web:025e09441f55055c7dbcaf",
  measurementId: "G-E9L865YGHQ",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export {
  storage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  db,
  collection,
  addDoc,
  getDocs
};
