import { inicializarBanco, escutarSemafaro, setBotao } from "./api.js";

// ELEMENTOS
const imgMotorista = document.getElementById("motorista");
const imgPedestre  = document.getElementById("pedestre");

// INICIA BANCO
await inicializarBanco();

// RECEBE DADOS DO FIREBASE
escutarSemafaro((estado) => {
  console.log("Estado:", estado);

  // ─── MOTORISTA ───
  if (estado.motorista.verde) {
    imgMotorista.src = "img/semafaro-verde-removebg-preview.png";
  } 
  else if (estado.motorista.amarelo) {
    imgMotorista.src = "img/semafaro-amarelo-removebg-preview.png";
  } 
  else if (estado.motorista.vermelho) {
    imgMotorista.src = "img/semafaro-vermelho-removebg-preview.png";
  }

  // ─── PEDESTRE ───
  if (estado.pedestre.verde) {
    imgPedestre.src = "img/semafaro-verde-removebg-preview.png";
  } 
  else {
    imgPedestre.src = "img/semafaro-vermelho-removebg-preview.png";
  }
});

// (OPCIONAL) botão na tela
const btn = document.createElement("button");
btn.textContent = "Solicitar Travessia";
btn.style.marginTop = "30px";
btn.style.padding = "15px";
btn.style.fontSize = "18px";

document.body.appendChild(btn);

btn.addEventListener("click", async () => {
  await setBotao(true);
});