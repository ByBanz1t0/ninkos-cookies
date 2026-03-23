import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAEyl-g55Qc646M8lhlCpKvQCoux5gG4VA",
    authDomain: "ninkos-cookies.firebaseapp.com",
    projectId: "ninkos-cookies",
    storageBucket: "ninkos-cookies.firebasestorage.app",
    messagingSenderId: "1065814927466",
    appId: "1:1065814927466:web:405c7357f761d98ea3c213"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    const menuLogin = document.getElementById('menu-login');
    const menuUser = document.getElementById('menu-user');
    const menuLogout = document.getElementById('menu-logout');

    if (user) {
        // Usuário logado: mostra perfil e esconde login
        if (menuLogin) menuLogin.style.display = 'none';
        if (menuUser) {
            menuUser.classList.remove('hidden');
            menuUser.style.display = 'block';
            menuUser.innerHTML = `<a href="perfil.html" class="btn-auth">👤 Meu Perfil</a>`;
        }
        if (menuLogout) {
            menuLogout.classList.remove('hidden');
            menuLogout.style.display = 'block';
        }
    } else {
        // Deslogado: mostra login e esconde perfil
        if (menuLogin) menuLogin.style.display = 'block';
        if (menuUser) menuUser.style.display = 'none';
        if (menuLogout) menuLogout.style.display = 'none';
    }
});

// Evento de Logout
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-auth-sair')) {
        signOut(auth).then(() => {
            window.location.href = "index.html";
        });
    }
});