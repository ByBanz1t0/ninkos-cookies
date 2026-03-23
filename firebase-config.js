// Importa as funções principais do Firebase (usando a versão 10.7.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// SUAS CREDENCIAIS DO FIREBASE (Você precisa substituir esses valores)
const firebaseConfig = {
    apiKey: "AIzaSyAEyl-g55Qc646M8lhlCpKvQCoux5gG4VA",
    authDomain: "ninkos-cookies.firebaseapp.com",
    projectId: "ninkos-cookies",
    storageBucket: "ninkos-cookies.firebasestorage.app",
    messagingSenderId: "1065814927466",
    appId: "1:1065814927466:web:405c7357f761d98ea3c213"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços de Autenticação e Banco de Dados
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta para que os outros arquivos (perfil.js, auth-control.js) possam usar
export { auth, db };