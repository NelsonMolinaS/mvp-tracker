import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDrf9MCH7Dann6roLnG-6k2FldSklnK0VA",
  authDomain: "mvp-tracker-e43ea.firebaseapp.com",
  databaseURL: "https://mvp-tracker-e43ea-default-rtdb.firebaseio.com",
  projectId: "mvp-tracker-e43ea",
  storageBucket: "mvp-tracker-e43ea.firebasestorage.app",
  messagingSenderId: "899122130702",
  appId: "1:899122130702:web:8c0e6a44c4167ead34b15f",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
