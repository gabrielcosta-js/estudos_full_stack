// api.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "projeto-semafaro.firebaseapp.com",
  databaseURL: "https://projeto-semafaro-default-rtdb.firebaseio.com",
  projectId: "projeto-semafaro",
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// REFERÊNCIAS
const refs = {
  motorista: {
    verde:    ref(db, "semafaro/motorista/verde"),
    amarelo:  ref(db, "semafaro/motorista/amarelo"),
    vermelho: ref(db, "semafaro/motorista/vermelho"),
  },
  pedestre: {
    verde:    ref(db, "semafaro/pedestre/verde"),
    vermelho: ref(db, "semafaro/pedestre/vermelho"),
  },
  botao: ref(db, "semafaro/botao"),
};

// INICIALIZAÇÃO
export async function inicializarBanco() {
  const snapshot = await get(ref(db, "semafaro"));

  if (!snapshot.exists()) {
    await set(ref(db, "semafaro"), {
      motorista: {
        verde: true,
        amarelo: false,
        vermelho: false,
      },
      pedestre: {
        verde: false,
        vermelho: true,
      },
      botao: false,
    });
  }
}

// ESCRITA
export async function setBotao(estado) {
  await set(refs.botao, estado);
}

// LEITURA TEMPO REAL
export function escutarSemafaro(callback) {
  onValue(ref(db, "semafaro"), (snapshot) => {
    const dados = snapshot.val();
    if (!dados) return;

    callback({
      motorista: {
        verde: dados.motorista?.verde ?? false,
        amarelo: dados.motorista?.amarelo ?? false,
        vermelho: dados.motorista?.vermelho ?? false,
      },
      pedestre: {
        verde: dados.pedestre?.verde ?? false,
        vermelho: dados.pedestre?.vermelho ?? true,
      },
      botao: dados.botao ?? false,
    });
  });
}