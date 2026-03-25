import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const menuUser = document.getElementById('menu-user');
const menuLogout = document.getElementById('menu-logout');

// ==========================================================================
// FUNÇÃO DE NOTIFICAÇÕES (TOASTS)
// ==========================================================================
export function mostrarNotificacao(mensagem, icone = '🍪') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icone}</span> ${mensagem}`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ==========================================================================
// CONTROLE DE AUTENTICAÇÃO
// ==========================================================================
onAuthStateChanged(auth, async (user) => {
    console.log("Status Auth:", user ? "Logado" : "Deslogado");

    if (user) {
        try {
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);
            
            let nomeParaExibir = "Minha Conta";
            let ehAdmin = false;
            let pontos = 0; // Variável para o sistema de fidelidade

            if (docSnap.exists()) {
                const dados = docSnap.data();
                nomeParaExibir = dados.nome ? dados.nome.split(' ')[0] : "Usuário";
                pontos = dados.pontos || 0; // Busca os pontos do banco
                
                if (dados.isAdmin === true || dados.regra === 'admin') {
                    ehAdmin = true;
                }
            }

            // Notificação de boas-vindas (opcional, remova se achar chato)
            // mostrarNotificacao(`Bem-vindo, ${nomeParaExibir}!`, '👋');

            if (menuUser) {
                let htmlMenu = `
                    <a href="meus-pedidos.html" class="btn-meus-pedidos">
                        📦
                    </a>
                `;

                if (ehAdmin) {
                    htmlMenu += `
                        <a href="admin.html" class="btn-auth" style="background-color: #000; color: #fff; border-color: #000; margin-right: 10px;">
                            ⚙️
                        </a>
                    `;
                }

                // Exibe pontos no menu se quiser (Opcional)
                // htmlMenu += `<span style="font-size: 0.8rem; color: #d63384;">✨ ${pontos} pts</span>`;

                htmlMenu += `<a href="perfil.html" class="btn-auth">👤</a>`;

                menuUser.innerHTML = htmlMenu;
                menuUser.classList.remove('hidden');
                menuUser.style.display = "flex"; 
                menuUser.style.alignItems = "center";
                menuUser.style.gap = "5px";
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
            // Notifica antes de redirecionar
            mostrarNotificacao('Até logo!', '👋');
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        }).catch((error) => {
            console.error("Erro ao deslogar:", error);
        });
    }
});
