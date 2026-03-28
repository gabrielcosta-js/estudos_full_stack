import * as api from './api.js';

const btnAdicionarUser = document.getElementById("btnAdicionarUser");
const btnAdicionarTarefa = document.getElementById("btnAdicionarTarefa");
const btnApagar = document.querySelector("#btnApagar")

const listaUsersUl = document.querySelector("#listaUsersUl");
const listaTarefasUl = document.querySelector("#listaTarefasUl");

const inputListaUser = document.querySelector("#inputListaUser");
const inputListaEmail = document.querySelector("#inputListaEmail");
const inputListaTarefa = document.querySelector("#inputListaTarefa");

let usuarioestaEditando = false;

export async function carregarUsers() {

  listaUsersUl.innerHTML = "" // Faz com que não duplique os Users

  const users = await api.getUsers(); // Responsável por puxar as informações, foi necessario criar uma varíavel pra poder fazer o For Each, normalmente me outras ocasioes não usa

  users.forEach((user) => { // Acessar cada User criado
    const listaUsers = document.createElement('li'); // Criando Elemento Visual
    listaUsers.textContent = `Usuário: ${user.nomeUser} - Email: ${user.email}` // Alimentando

    listaUsersUl.appendChild(listaUsers); // Adicionando Visualmente
  });
}

export async function carregarTarefas() {

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

    // Criação do Botão de Editar (PUT)
    const btnEditar = document.createElement('button');
    btnEditar.textContent = '✏️';
    btnEditar.style.marginLeft = '10px';
    btnEditar.addEventListener('click', () => modoEditar(task, btnEditar)); // Criei botão com dois modo

    // Criação do Botão Apagar (DELETE)
    const btnApagar = document.createElement('button');
    btnApagar.textContent = '❌';
    btnApagar.style.marginLeft = '10px'

    btnApagar.addEventListener('click', async () => {
      await api.deleteTaks(task.id)
      carregarTarefas();
    })

    listaTask.appendChild(checkbox);
    listaTask.appendChild(btnEditar);
    listaTask.appendChild(btnApagar);
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

export async function adicionarTarefa() {
  btnAdicionarTarefa.addEventListener('click', async () => {

    if (usuarioestaEditando) {
      alert("Finalize a edição primeiro seu idiota, clique no simbolo de 💾");
      return;
    }

    // Adicionando Tarefa (POST)
    const novaTask = {
      nomeTarefa: inputListaTarefa.value,
      status: false
    }
    await api.postTasks(novaTask); // POST
    carregarTarefas();
  })
}


function modoEditar(task, btnEditar) {
  usuarioestaEditando = true;
  inputListaTarefa.focus();
  inputListaTarefa.value = task.nomeTarefa;
  btnEditar.textContent = '💾';
  btnEditar.removeEventListener('click', modoEditar);
  btnEditar.addEventListener('click', () => modoSalvar(task, btnEditar));
}
async function modoSalvar(task, btnEditar) {
  usuarioestaEditando = false;
  const alterarTaskSalvar = {
    nomeTarefa: inputListaTarefa.value,
    status: false
  }

  await api.putTaks(task.id, alterarTaskSalvar);

  btnEditar.textContent = "✏️";

  btnEditar.removeEventListener('click', modoSalvar);

  btnEditar.addEventListener('click', modoEditar);

  carregarTarefas();
}