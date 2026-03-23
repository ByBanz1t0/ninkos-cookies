// Função para carregar os itens salvos no LocalStorage
function carregarItensCarrinho() {
    const itens = JSON.parse(localStorage.getItem('carrinho')) || [];
    const container = document.getElementById('itens-carrinho'); // Certifique-se que esse ID existe no seu HTML
    const totalElemento = document.getElementById('cart-total');
    let totalGeral = 0;

    if (!container) return; // Segurança caso o script rode em outra página

    if (itens.length === 0) {
        container.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio!</p>';
        if(totalElemento) totalElemento.innerText = 'R$ 0,00';
        return;
    }

    container.innerHTML = ''; // Limpa a "sujeira" antes de carregar

    itens.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        // Aqui usamos exatamente as classes do seu CSS de 644 linhas
        container.innerHTML += `
            <div class="item-carrinho">
                <div class="item-visual">
                    <img src="${item.imagem}" class="item-foto-carrinho" alt="${item.nome}">
                    <div class="item-info">
                        <span class="item-nome">${item.nome}</span>
                        <span class="item-preco-unit">R$ ${item.preco.toFixed(2)}</span>
                    </div>
                </div>
                <div class="item-controles">
                    <div class="qtd-botoes">
                        <button onclick="alterarQtd(${index}, -1)">-</button>
                        <span>${item.quantidade}</span>
                        <button onclick="alterarQtd(${index}, 1)">+</button>
                    </div>
                    <span class="item-subtotal">R$ ${subtotal.toFixed(2)}</span>
                    <button class="btn-remover" onclick="removerItem(${index})">🗑️</button>
                </div>
            </div>
        `;
    });

    if(totalElemento) totalElemento.innerText = `R$ ${totalGeral.toFixed(2)}`;
}

// Função para aumentar ou diminuir a quantidade
window.alterarQtd = function(index, mudanca) {
    let itens = JSON.parse(localStorage.getItem('carrinho'));
    itens[index].quantidade += mudanca;

    if (itens[index].quantidade <= 0) {
        itens.splice(index, 1); // Remove se chegar a zero
    }

    localStorage.setItem('carrinho', JSON.stringify(itens));
    carregarItensCarrinho(); // Atualiza a tela
};

// Função para remover item direto
window.removerItem = function(index) {
    let itens = JSON.parse(localStorage.getItem('carrinho'));
    itens.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(itens));
    carregarItensCarrinho();
};

// Inicia quando a página carrega
document.addEventListener('DOMContentLoaded', carregarItensCarrinho);