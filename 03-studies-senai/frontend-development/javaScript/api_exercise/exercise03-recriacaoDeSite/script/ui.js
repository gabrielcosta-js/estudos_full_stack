const buttonadicionarPensamanetoModal = document.getElementById('buttonadicionarPensamanetoModal');

const tituloh1 = document.getElementById('tituloh1');

export function adicionarPensamento(){
    buttonadicionarPensamanetoModal.addEventListener('click', abrirModal);
}

let modal; 

function criarModal(){
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal');

    const h1Pensamento = document.createElement('h1');
    h1Pensamento.textContent = 'Pensamento';

    const inputPensamento = document.createElement('textarea');
    inputPensamento.placeholder = 'Digite seu Pensamento';

    const h1Autor = document.createElement('h1');
    h1Autor.textContent = 'Autor';

    const inputAutor = document.createElement('textarea');

    const modalContainerButtons = document.createElement('div');

    const buttonAdicionarPensamento = document.createElement('button');
    buttonAdicionarPensamento.textContent = 'Adicionar';

    const buttonFecharModal = document.createElement('button');
    buttonFecharModal.textContent = 'Fechar';

    buttonFecharModal.addEventListener('click', fecharModal);

    modalContainer.append(
        h1Pensamento,
        inputPensamento,
        h1Autor,
        inputAutor,
        modalContainerButtons
    );

    modalContainerButtons.append(
        buttonAdicionarPensamento,
        buttonFecharModal
    );

    return modalContainer;
}

function abrirModal() {
    modal = criarModal();
    tituloh1.after(modal); 
}

function fecharModal(){
    if(modal){
        modal.remove(); 
    }
}

