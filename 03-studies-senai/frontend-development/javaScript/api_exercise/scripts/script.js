const btn = document.getElementById("btn");
    const ul = document.querySelector("ul");
    const inputLista = document.querySelector("#inputLista");
    const btnApagar = document.querySelector("#btnApagar")

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
    function atualizarLista(){
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