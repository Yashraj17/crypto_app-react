
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJ2iTeNwWQkUsLj_3jfRWRuHfjtAx_cGA",
  authDomain: "crypto-reactjs.firebaseapp.com",
  projectId: "crypto-reactjs",
  storageBucket: "crypto-reactjs.appspot.com",
  messagingSenderId: "951034142056",
  appId: "1:951034142056:web:fb5abdb01ef5f4575b0add"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};