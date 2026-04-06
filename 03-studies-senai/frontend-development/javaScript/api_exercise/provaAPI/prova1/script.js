import * as api from './api.js';

const lista = document.getElementById("listaAlunos");
const modal = document.getElementById("modal");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cursoInput = document.getElementById("curso");
const btnNovo = document.getElementById("btnNovo");
const btnCancelar = document.getElementById("cancelar");
const btnSalvar = document.getElementById("salvar");

let alunoEditando = null;

export async function carregarAlunos() {
    const alunos = await api.getAluno();

    lista.innerHTML = "";

    alunos.forEach(aluno => {
        // Criação do container de cada aluno
        const containeraluno = document.createElement('div');
        containeraluno.classList.add('card');

        // 👉 já aplica classe se vier inativo da API
        if (!aluno.ativo) {
            containeraluno.classList.add('inativo');
        }

        // Criação dos elementos visuais
        const nomeAluno = document.createElement('p');
        nomeAluno.textContent = `Nome do aluno: ${aluno.nome}`;

        const idadeAluno = document.createElement('p')
        idadeAluno.textContent = `Idade: ${aluno.idade} anos`;

        const cursoAluno = document.createElement('p');
        cursoAluno.textContent = `Curso do aluno: ${aluno.curso}`;

        // Criação da Check BOX
        const CheckBoxStatusAluno = document.createElement('input');
        CheckBoxStatusAluno.type = "checkbox";
        CheckBoxStatusAluno.checked = aluno.ativo;
        CheckBoxStatusAluno.style.marginLeft = '10px'

        CheckBoxStatusAluno.addEventListener("change", () => 
            alternarStatus(aluno, CheckBoxStatusAluno, containeraluno)
        );

        // Criação do botão de Editar
        const buttonEditarAluno = document.createElement('button');
        buttonEditarAluno.textContent = '✏️';
        buttonEditarAluno.style.marginLeft = '10px'
        buttonEditarAluno.addEventListener('click', () => abrirModal(aluno));

        // Criação do botão de Apagar
        const buttonApagarAluno = document.createElement('button')
        buttonApagarAluno.textContent = '❌';
        buttonApagarAluno.style.marginLeft = '10px'
        buttonApagarAluno.addEventListener('click', () => excluirAlunos(aluno));

        // Após eu criar, eu adiciono ao HTML
        lista.appendChild(containeraluno);
        containeraluno.appendChild(nomeAluno);
        containeraluno.appendChild(idadeAluno);
        containeraluno.appendChild(cursoAluno);
        containeraluno.appendChild(CheckBoxStatusAluno);
        containeraluno.appendChild(buttonEditarAluno);
        containeraluno.appendChild(buttonApagarAluno);
    });
}

async function alternarStatus(aluno, checkbox, containeraluno) {
    const statusAtualizado = {
        nome: aluno.nome,
        idade: aluno.idade,
        curso: aluno.curso,
        ativo: checkbox.checked,
    };

    await api.patchAluno(aluno.id, statusAtualizado);

    if (!checkbox.checked) {
        containeraluno.classList.add('inativo');
    } else {
        containeraluno.classList.remove('inativo');
    }

    carregarAlunos();
}

async function editarAlunos(aluno){
    const editarAluno = {
        nome: nomeInput.value,
        idade: idadeInput.value,
        curso: cursoInput.value,
        ativo: aluno.ativo
    };

    await api.putAluno(aluno.id, editarAluno);

    fecharModal();
    carregarAlunos();
}

async function excluirAlunos(aluno){
    await api.deleteAluno(aluno.id);
    carregarAlunos();
}

function criarAluno() {
    btnSalvar.onclick = async () => {
        if (alunoEditando) {
            await editarAlunos(alunoEditando);
        } else {
            const novoAluno = {
                nome: nomeInput.value,
                idade: idadeInput.value,
                curso: cursoInput.value,
                ativo: true
            }

            await api.postAluno(novoAluno);
            fecharModal();
            carregarAlunos();
        }
    }
}

function abrirModal(aluno = null) {
    modal.classList.remove("hidden");
    criarAluno();

    if (aluno) {
        nomeInput.value = aluno.nome;
        idadeInput.value = aluno.idade;
        cursoInput.value = aluno.curso;
        alunoEditando = aluno;
    } else {
        nomeInput.value = "";
        idadeInput.value = "";
        cursoInput.value = "";
        alunoEditando = null;
    }
}

function fecharModal() {
    modal.classList.add("hidden");
}

btnNovo.addEventListener("click", () => abrirModal());
btnCancelar.addEventListener("click", fecharModal);