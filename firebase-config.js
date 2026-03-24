// Importa as funções principais do Firebase (usando a versão 10.7.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// 1. Adicionado import do Storage
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// SUAS CREDENCIAIS DO FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyAEyl-g55Qc646M8lhlCpKvQCoux5gG4VA",
    authDomain: "ninkos-cookies.firebaseapp.com",
    projectId: "ninkos-cookies",
    storageBucket: "ninkos-cookies.appspot.com", // Verifique se no console termina em .appspot.com ou .firebasestorage.app
    messagingSenderId: "1065814927466",
    appId: "1:1065814927466:web:405c7357f761d98ea3c213"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços
const auth = getAuth(app);
const db = getFirestore(app);
// 2. Inicializa o Storage
const storage = getStorage(app);

// 3. Exporta o storage junto com auth e db
export { auth, db, storage };