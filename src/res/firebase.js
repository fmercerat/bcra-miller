import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBQ8ApQynRTEWnlJ0idir-aPZ3FfYfq_To",
    authDomain: "miller-bcra.firebaseapp.com",
    projectId: "miller-bcra",
    messagingSenderId: "940983932093",
    appId: "1:940983932093:web:044cf1105c0cb6be3093d4",
    measurementId: "G-9KF89FPCLP"
};

export function initFirebase() {
    return initializeApp(firebaseConfig);
}

export function obtenerFirestore() {
    return getFirestore(initFirebase());  
} 