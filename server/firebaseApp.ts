import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDXMRgCJzlUGQWAczPURoz39H1a8_QUhHs",
    authDomain: "shellhacks2022.firebaseapp.com",
    databaseURL: "https://shellhacks2022-default-rtdb.firebaseio.com",
    projectId: "shellhacks2022",
    storageBucket: "shellhacks2022.appspot.com",
    messagingSenderId: "1046738810303",
    appId: "1:1046738810303:web:8d029ffb3a46358d341d0a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
