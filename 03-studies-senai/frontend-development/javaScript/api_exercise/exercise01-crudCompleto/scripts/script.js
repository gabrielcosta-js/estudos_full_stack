import * as api from "./api.js";

const btnAdicionarUser = document.getElementById("btnAdicionarUser");
const btnAdicionarTarefa = document.getElementById("btnAdicionarTarefa");
const btnApagarUsersAll = document.querySelector("#btnApagarUsersAll");
const btnApagarTarefaAll = document.querySelector("#btnApagarTarefaAll");

const listaUsersUl = document.querySelector("#listaUsersUl");
const listaTarefasUl = document.querySelector("#listaTarefasUl");

const inputListaUser = document.querySelector("#inputListaUser");
const inputListaEmail = document.querySelector("#inputListaEmail");
const inputListaTarefa = document.querySelector("#inputListaTarefa");

let usuarioestaEditando = false;

export async function carregarUsers() {
  listaUsersUl.innerHTML = ""; // Faz com que não duplique os Users

  const users = await api.getUsers(); // Responsável por puxar as informações, foi necessario criar uma varíavel pra poder fazer o For Each, normalmente me outras ocasioes não usa

  users.forEach((user) => {
    // Acessar cada User criado
    const listaUsers = document.createElement("li"); // Criando Elemento Visual
    listaUsers.textContent = `Usuário: ${user.nomeUser} - Email: ${user.email}`; // Alimentando

    const botoes = criarBotoesUser(user); // Ele vai receber o Container dos buttons ao invés de eu retornar vários buttons

    listaUsers.appendChild(botoes);
    listaUsersUl.appendChild(listaUsers); // Adicionando Visualmente
  });
}

export async function carregarTarefas() {
  listaTarefasUl.innerHTML = ""; // Faz com que não duplique os Users

  const tasks = await api.getTasks(); // Responsável por puxar as informações

  tasks.forEach((task) => {
    // Acessar cada User criado
    const listaTask = document.createElement("li"); // Criando Elemento Visual
    listaTask.textContent = `Nome da Tarefa: ${task.nomeTarefa}`; // Alimentando

    const botoes = criarbotoesTask(task); // Ele vai receber o Container dos buttons ao invés de eu retornar vários buttons

    listaTask.appendChild(botoes);
    listaTarefasUl.appendChild(listaTask); // Adicionando Visualmente
  });
}

export async function adicionarUser() {
  btnAdicionarUser.addEventListener("click", async () => {
    // Não esquecer de botar async nos eventos

    const user = {
      // Objeto pra passar os dados pro post
      nomeUser: inputListaUser.value,
      email: inputListaEmail.value,
    };
    await api.postUsers(user);

    carregarUsers(); // Mostrar a adição no código

    inputListaUser.value = "";
    inputListaEmail.value = "";
  });
}

export async function adicionarTarefa() {
  btnAdicionarTarefa.addEventListener("click", async () => {
    if (usuarioestaEditando) {
      alert("Finalize a edição primeiro seu idiota, clique no simbolo de 💾");
      return;
    }

    // Adicionando Tarefa (POST)
    const novaTask = {
      nomeTarefa: inputListaTarefa.value,
      status: false,
    };
    await api.postTasks(novaTask); // POST
    carregarTarefas();
  });
}

export function ApagarTodosUsers() {
  btnApagarUsersAll.addEventListener("click", async () => {
    const users = await api.getUsers();

    for (const user of users) {
      await api.deleteUsers(user.id);
    }

    carregarUsers();
  });
}

export function ApagarTodasTarefas() {
  btnApagarTarefaAll.addEventListener("click", async () => {
    const tasks = await api.getTasks();

    for (const task of tasks) {
      await api.deleteTaks(task.id);
    }

    carregarTarefas();
  });
}

function criarbotoesTask(task) {
  const container = document.createElement("span"); // Criação do Container pra agrupar os buttons

  // Criando Check Box
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.status;
  checkbox.style.marginLeft = "10px";

  checkbox.addEventListener("change", async () => {
    const taskAtualizada = {
      nomeTarefa: task.nomeTarefa,
      status: checkbox.checked,
    };

    await api.putTaks(task.id, taskAtualizada);
    carregarTarefas();
  });

  // Criação do Botão de Editar (PUT)
  const btnEditar = document.createElement("button");
  btnEditar.textContent = "✏️";
  btnEditar.style.marginLeft = "10px";
  btnEditar.addEventListener("click", () => modoEditar(task, btnEditar)); // Criei botão com dois modo

  // Criação do Botão Apagar (DELETE)
  const btnApagar = document.createElement("button");
  btnApagar.textContent = "❌";
  btnApagar.style.marginLeft = "10px";

  btnApagar.addEventListener("click", async () => {
    await api.deleteTaks(task.id);
    carregarTarefas();
  });

  container.appendChild(checkbox);
  container.appendChild(btnEditar);
  container.appendChild(btnApagar);

  return container; // Retorno de um elemento ao inves de vários
}
function criarBotoesUser(user) {
  const container = document.createElement("span");

  const btnApagar = document.createElement("button");
  btnApagar.textContent = "❌";
  btnApagar.style.marginLeft = "10px";

  btnApagar.addEventListener("click", async () => {
    await api.deleteUsers(user.id);
    carregarUsers();
  });

  container.appendChild(btnApagar);

  return container;
}

function modoEditar(task, btnEditar) {
  usuarioestaEditando = true;
  inputListaTarefa.focus();
  inputListaTarefa.value = task.nomeTarefa;
  btnEditar.textContent = "💾";
  btnEditar.removeEventListener("click", modoEditar);
  btnEditar.addEventListener("click", () => modoSalvar(task, btnEditar));
}
async function modoSalvar(task, btnEditar) {
  usuarioestaEditando = false;

  const alterarTaskSalvar = {
    nomeTarefa: inputListaTarefa.value,
    status: false,
  };

  await api.putTaks(task.id, alterarTaskSalvar);

  btnEditar.textContent = "✏️";

  btnEditar.removeEventListener("click", modoSalvar);

  btnEditar.addEventListener("click", modoEditar);

  carregarTarefas();
}
