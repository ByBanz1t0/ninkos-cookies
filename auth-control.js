import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const menuUser = document.getElementById('menu-user');
const menuLogout = document.getElementById('menu-logout');

onAuthStateChanged(auth, async (user) => {
    console.log("Status Auth:", user ? "Logado" : "Deslogado");

    if (user) {
        try {
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);
            
            let nomeParaExibir = "Minha Conta";
            let ehAdmin = false;

            if (docSnap.exists()) {
                const dados = docSnap.data();
                nomeParaExibir = dados.nome ? dados.nome.split(' ')[0] : "Usuário";
                
                // Verifica se o usuário tem a flag de administrador
                if (dados.isAdmin === true || dados.regra === 'admin') {
                    ehAdmin = true;
                }
            }

            if (menuUser) {
                // Monta o HTML base
                let htmlMenu = `<a href="perfil.html" class="btn-auth">Olá, ${nomeParaExibir}</a>`;

                // Se for Admin, adiciona o botão de Painel antes do perfil
                if (ehAdmin) {
                    htmlMenu = `
                        <a href="admin.html" class="btn-auth" style="background-color: #000; color: #fff; border-color: #000; margin-right: 10px;">
                            ⚙️ Painel Admin
                        </a>
                    ` + htmlMenu;
                }

                menuUser.innerHTML = htmlMenu;
                menuUser.classList.remove('hidden');
                menuUser.style.display = "flex"; // Ajustado para flex para alinhar os dois botões
                menuUser.style.alignItems = "center";
            }
            
            if (menuLogout) {
                menuLogout.classList.remove('hidden');
                menuLogout.style.display = "block";
            }
        } catch (error) {
            console.error("Erro ao buscar dados no Firestore:", error);
        }

    } else {
        if (menuUser) {
            menuUser.innerHTML = `<a href="login.html" class="btn-auth">Login / Cadastro</a>`;
            menuUser.classList.remove('hidden');
            menuUser.style.display = "block";
        }
        if (menuLogout) {
            menuLogout.classList.add('hidden');
            menuLogout.style.display = "none";
        }
    }
});

// Configura o clique no botão "Sair"
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-auth-sair')) {
        e.preventDefault();
        signOut(auth).then(() => {
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Erro ao deslogar:", error);
        });
    }
});