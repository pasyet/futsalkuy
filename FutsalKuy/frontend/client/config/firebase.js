import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC7qiFZMJFLvhgsAntD_ZVX-hA9OTnyPWE",
  authDomain: "chat-test-9ace9.firebaseapp.com",
  databaseURL: "https://chat-test-9ace9-default-rtdb.firebaseio.com",
  projectId: "chat-test-9ace9",
  storageBucket: "chat-test-9ace9.appspot.com",
  messagingSenderId: "122869385492",
  appId: "1:122869385492:web:af3005f895d19a5e125a01"
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();