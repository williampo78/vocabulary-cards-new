// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzYX8WE3LNiyQNrsil99X-e72yoKrJLds",
  authDomain: "vocabulary-cards-a3447.firebaseapp.com",
  projectId: "vocabulary-cards-a3447",
  storageBucket: "vocabulary-cards-a3447.appspot.com",
  messagingSenderId: "845588216609",
  appId: "1:845588216609:web:83363d9c216099522c1c60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, "cards");

export {
  colRef,
  db,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  updateDoc,
};
