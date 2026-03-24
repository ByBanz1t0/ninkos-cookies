import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAEyl-g55Qc646M8lhlCpKvQCoux5gG4VA",
    authDomain: "ninkos-cookies.firebaseapp.com",
    projectId: "ninkos-cookies",
    messagingSenderId: "1065814927466",
    appId: "1:1065814927466:web:405c7357f761d98ea3c213"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };