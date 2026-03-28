import * as api from './api.js';

const btnAdicionarUser = document.getElementById("btnAdicionarUser");
const listaUsersUl = document.querySelector("#listaUsersUl");
const listaTarefasUl = document.querySelector("#listaTarefasUl");
const inputListaUser = document.querySelector("#inputListaUser");
const inputListaEmail = document.querySelector("#inputListaEmail");
const btnApagar = document.querySelector("#btnApagar")

 export async function carregarUsers(){

    listaUsersUl.innerHTML = "" // Faz com que não duplique os Users

    const users = await api.getUsers(); // Responsável por puxar as informações, foi necessario criar uma varíavel pra poder fazer o For Each, normalmente me outras ocasioes não usa

    users.forEach((user) => { // Acessar cada User criado
      const listaUsers = document.createElement('li'); // Criando Elemento Visual
      listaUsers.textContent = `Usuário: ${user.nomeUser} - Email: ${user.email}` // Alimentando

      listaUsersUl.appendChild(listaUsers); // Adicionando Visualmente
    });
}

 export async function carregarTarefas(){

    listaTarefasUl.innerHTML = "" // Faz com que não duplique os Users

    const tasks = await api.getTasks(); // Responsável por puxar as informações

    tasks.forEach((task) => { // Acessar cada User criado
      const listaTask = document.createElement('li'); // Criando Elemento Visual
      listaTask.textContent = `Nome da Tarefa: ${task.nomeTarefa}` // Alimentando
      
      // Criando Check Box
      const checkbox = document.createElement('input'); 
      checkbox.type = 'checkbox';
      checkbox.checked = task.status;
      checkbox.style.marginLeft = '10px';


      listaTask.appendChild(checkbox);
      listaTarefasUl.appendChild(listaTask); // Adicionando Visualmente
    });
}

export async function adicionarUser() {
  btnAdicionarUser.addEventListener('click', async () => { // Não esquecer de botar async nos eventos
   
    const user = { // Objeto pra passar os dados pro post
      nomeUser: inputListaUser.value,
      email: inputListaEmail.value
    }
     await api.postUsers(user);

     carregarUsers(); // Mostrar a adição no código

     inputListaUser.value = ""
     inputListaEmail.value = ""

  })
}

/*
function adcLista() {
  if (inputLista.value.trim()) {
    const li = document.createElement("li");
    li.textContent = inputLista.value;
    li.style.marginBottom = "10px"

    // cria botão
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.style.marginLeft = "10px";

    // evento de remover
    btnRemover.addEventListener("click", () => {
      li.remove();
      atualizarLista();
    });

    // Botão pra marcar como concluído
    const btnConcluido = document.createElement("button");
    btnConcluido.textContent = "Marcar Como Concluído";
    btnConcluido.style.marginLeft = "10px";

    // Criação do Evento concluído
    btnConcluido.addEventListener("click", () => {
      // li.classList.add("concluido"); Modifiquei para utilizar o Toggle ao invés disso, q tbm funciona, poupou linha de código pq não preciso programar pra quando ele clicar de novo remover a marcação, útil
      li.classList.toggle("concluido");
    });

    // adiciona botão dentro do li e na ul
    li.appendChild(btnRemover);
    li.appendChild(btnConcluido);
    ul.appendChild(li);

    // Limpar o input e focar nele pra escrever novo texto
    inputLista.value = "";
    inputLista.focus();

    atualizarLista();
  } else {
    alert("Escreva algo primeiro!");
  }
}

// Função para atualizar o total de LI cada vez que for chamada
function atualizarLista() {
  const itens = document.querySelectorAll("li");
  totalLi.textContent = `Total de itens da Lista: ${itens.length}`
}

btn.addEventListener("click", () => {
  adcLista();
});

btnApagar.addEventListener("click", () => {
  const itens = document.querySelectorAll("li");

  itens.forEach((item) => {
    item.remove(); // Apaga um elemento da lista
  })


  atualizarLista();
});

// Criação do Total de LI pra mostrar visualmente pro usuário
const totalLi = document.createElement("p");
totalLi.textContent = "Total de itens da Lista: 0";

btn.after(totalLi); // Colocando ele após o button

*/