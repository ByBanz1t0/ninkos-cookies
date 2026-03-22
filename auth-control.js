import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Configuração do seu Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAEyl-g55Qc646M8lhlCpKvQCoux5gG4VA",
    authDomain: "ninkos-cookies.firebaseapp.com",
    projectId: "ninkos-cookies",
    storageBucket: "ninkos-cookies.firebasestorage.app",
    messagingSenderId: "1065814927466",
    appId: "1:1065814927466:web:405c7357f761d98ea3c213"
};

// Inicialização
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Função principal para atualizar a interface do usuário
 */
const atualizarInterface = (user) => {
    const menuLogin = document.getElementById('menu-login');
    const menuUser = document.getElementById('menu-user');
    const menuLogout = document.getElementById('menu-logout');

    // Verifica se os elementos existem na página atual para não dar erro no console
    if (!menuLogin || !menuUser || !menuLogout) return;

    if (user) {
        // --- ESTADO: LOGADO ---
        
        // 1. Esconde o botão de entrar
        menuLogin.classList.add('hidden');
        
        // 2. Mostra e preenche a área do usuário
        menuUser.classList.remove('hidden');
        // Injetamos o link "Minha Conta" que o CSS agora já sabe estilizar
        menuUser.innerHTML = `<a href="perfil.html" class="btn-auth">Minha Conta</a>`;
        
        // 3. Mostra o botão de sair
        menuLogout.classList.remove('hidden');
        
    } else {
        // --- ESTADO: DESLOGADO ---
        
        // 1. Mostra o botão de entrar
        menuLogin.classList.remove('hidden');
        
        // 2. Esconde a área do usuário e limpa o conteúdo
        menuUser.classList.add('hidden');
        menuUser.innerHTML = '';
        
        // 3. Esconde o botão de sair
        menuLogout.classList.add('hidden');
    }
};

/**
 * Listener do Firebase: Roda toda vez que o estado do usuário muda
 */
onAuthStateChanged(auth, (user) => {
    atualizarInterface(user);
});

/**
 * Lógica do botão Sair (Usando delegação de evento para evitar erros)
 */
document.addEventListener('click', (e) => {
    // Verifica se o elemento clicado (ou seu pai) tem a classe do botão de sair
    if (e.target.classList.contains('btn-auth-sair')) {
        e.preventDefault();
        
        signOut(auth).then(() => {
            console.log("Usuário deslogado com sucesso.");
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Erro ao deslogar:", error);
        });
    }
});