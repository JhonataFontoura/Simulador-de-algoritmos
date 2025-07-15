import { bubbleSort } from './algoritmos/ordenacao.js';
import { buscaLinear } from './algoritmos/busca.js';
import { Pilha } from './algoritmos/estrutura.js';

let array = gerarArray(20);
desenharArray(array);

function gerarArray(tamanho = 10) {
  return Array.from({ length: tamanho }, () => Math.floor(Math.random() * 100));
}

function desenharArray(arr, ativo1 = -1, ativo2 = -1) {
  const area = document.getElementById("visualizacao");
  area.innerHTML = "";
  arr.forEach((valor, i) => {
    const barra = document.createElement("div");
    barra.style.height = valor * 3 + "px";
    barra.className = "barra";
    if (i === ativo1 || i === ativo2) {
      barra.style.background = "red";
    }
    area.appendChild(barra);
  });
}

function desenharPilha(arr) {
  const area = document.getElementById("visualizacao");
  area.innerHTML = "";
  arr.forEach((valor) => {
    const bloco = document.createElement("div");
    bloco.className = "bloco-pilha";
    bloco.innerText = valor;
    area.appendChild(bloco);
  });
}

document.getElementById("executar").onclick = async () => {
  const tipo = document.getElementById("algoritmo").value;

  if (tipo === "bubble") {
    await bubbleSort([...array], desenharArray);
  } else if (tipo === "busca") {
    await buscaLinear([...array], array[5], desenharArray);
  } else if (tipo === "pilha") {
    const pilha = new Pilha(desenharPilha);
    pilha.push(10);
    pilha.push(20);
    pilha.pop();
    pilha.push(30);
  }
};
