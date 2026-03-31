import * as api from "./api.js";

const modal = document.getElementById("modal");

const nomeInput = document.getElementById("nome");
const precoInput = document.getElementById("preco");

const btnNovo = document.getElementById("btnNovo");
const btnCancelar = document.getElementById("cancelar");
const modalTitulo = document.getElementById("modalTitulo");

const listaProdutos = document.getElementById("listaProdutos")

let produtoEditando = null;

async function carregarProdutos() {

  listaProdutos.innerHTML = "";

  const produtos = await api.getProdutos();

  produtos.forEach((produto) => {
    const containerProduto = document.createElement("div")
    containerProduto.classList.add("card");

    const titulo = document.createElement("h3");
    titulo.classList.add("card-h3")
    titulo.textContent = produto.nome;

    const subTitulo = document.createElement("p");
    subTitulo.classList.add("card-p")
    subTitulo.textContent = produto.preco;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn-primario");
    btnEditar.style.marginRight= "85px"

    btnEditar.addEventListener("click", async () => {
       abrirModal("editar", produto);
    })


    const btnApagar = document.createElement("button");
    btnApagar.textContent = "Excluir";
    btnApagar.classList.add("btn-secundario");

    btnApagar.addEventListener("click", async () => {
     await api.deleteProdutos(produto.id)
    })

    listaProdutos.appendChild(containerProduto);
    containerProduto.appendChild(titulo);
    containerProduto.appendChild(subTitulo);
    containerProduto.appendChild(btnEditar);
    containerProduto.appendChild(btnApagar);
  });
  
}

function abrirModal(modo = "novo", produto = null) {
  console.log("Modal Aberto")
  modal.classList.remove("hidden");

  if (modo === "novo") {
    modalTitulo.innerText = "Novo Produto";
    nomeInput.value = "";
    precoInput.value = "";
    produtoEditando = null;
  } else {
    modalTitulo.innerText = "Editar Produto";
    nomeInput.value = produto.nome;
    precoInput.value = produto.preco;
    produtoEditando = produto;
  }
}

function fecharModal() {
  modal.classList.add("hidden");
}

// Já que não tem a main vou chamar aqui
btnNovo.addEventListener("click", () => abrirModal("novo"));
btnCancelar.addEventListener("click", fecharModal);

const btnSalvar = document.getElementById("salvar");

btnSalvar.addEventListener("click", async () => {

  const dadosProduto = {
    nome: nomeInput.value,
    preco: precoInput.value
  };

  if (produtoEditando) {

    await api.putProdutos(produtoEditando.id, dadosProduto);

  } else {

    await api.postProdutos(dadosProduto);

  }

  fecharModal();

  carregarProdutos();

});
carregarProdutos();
