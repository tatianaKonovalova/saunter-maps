import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABRnLhpQuSvPFodMkT_JOV27eeR6CpfOw",
  authDomain: "saunter-route.firebaseapp.com",
  projectId: "saunter-route",
  storageBucket: "saunter-route.appspot.com",
  messagingSenderId: "265396312032",
  appId: "1:265396312032:web:34d9f17e178440a5fdbd85"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);