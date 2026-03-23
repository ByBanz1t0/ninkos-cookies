import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Mapeia os elementos do seu Menu Fixo (conforme seu CSS de 644 linhas)
const menuUser = document.getElementById('menu-user');
const menuLogout = document.getElementById('menu-logout');

// 2. Monitora o estado do usuário (Logado ou Deslogado)
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Busca o nome do usuário no Firestore para exibir no menu
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        
        let nomeParaExibir = "Minha Conta";
        if (docSnap.exists()) {
            const dados = docSnap.data();
            // Pega o primeiro nome (ex: "Ezequias")
            nomeParaExibir = dados.nome ? dados.nome.split(' ')[0] : "Usuário";
        }

        // Atualiza o menu para mostrar o nome e o botão de Sair
        if (menuUser) {
            menuUser.innerHTML = `<a href="perfil.html" class="btn-auth">Olá, ${nomeParaExibir}</a>`;
            menuUser.classList.remove('hidden');
        }
        if (menuLogout) {
            menuLogout.classList.remove('hidden');
        }

    } else {
        // Caso não esteja logado, mostra o botão padrão de Login
        if (menuUser) {
            menuUser.innerHTML = `<a href="login.html" class="btn-auth">Login / Cadastro</a>`;
            menuUser.classList.remove('hidden');
        }
        if (menuLogout) {
            menuLogout.classList.add('hidden');
        }
    }
});

// 3. Configura o clique no botão "Sair"
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-auth-sair')) {
        e.preventDefault();
        signOut(auth).then(() => {
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Erro ao deslogar:", error);
        });
    }
});