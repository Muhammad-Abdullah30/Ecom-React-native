// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  
  apiKey: "AIzaSyAkOjaResobRrZAdRK4RyuV4_0ZH3YPMeE",
  authDomain: "ecommerce-069.firebaseapp.com",
  projectId: "ecommerce-069",
  storageBucket: "ecommerce-069.appspot.com",
  messagingSenderId: "51599669423",
  appId: "1:51599669423:web:b9df2c03e9bcb4c36a3c5a",
  measurementId: "G-M4BY1ZYMV6"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
export { db };
export default app;