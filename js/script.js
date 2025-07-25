import { bubbleSortStep, mergeSortStep } from './algoritmos/ordenacao.js';
import { buscaLinear } from './algoritmos/busca.js';
import { Pilha } from './algoritmos/estrutura.js';
import { quickSortStep } from './algoritmos/ordenacao.js';

/**
 * Array principal usado para testes de algoritmos.
 * Inicializado com valores aleatórios.
 */
let array = gerarArray(20);

/**
 * Generator global para controlar o passo a passo.
 * Inicialmente nulo.
 * @type {AsyncGenerator|null}
 */
let generator = null;

/**
 * Gera um array de inteiros aleatórios entre 0 e 99.
 * @param {number} tamanho - Tamanho do array.
 * @returns {number[]} Array gerado.
 */
function gerarArray(tamanho = 10) {
  return Array.from({ length: tamanho }, () => Math.floor(Math.random() * 100));
}

/**
 * Desenha o array na tela com elementos destacados.
 * @param {number[]} arr - Array de números.
 * @param {number} [ativo=-1] - Índice ativo (vermelho).
 * @param {number} [inicio=-1] - Início de subarray.
 * @param {number} [fim=-1] - Fim de subarray.
 * @param {number} [meio=-1] - Meio do array (separador).
 * @param {object} [lado={}] - Esquerda/direita destacados.
 */
function desenharArray(arr, ativo = -1, inicio = -1, fim = -1, meio = -1, lado = {}) {
  const area = document.getElementById("visualizacao");
  area.innerHTML = "";

  arr.forEach((valor, i) => {
    const bloco = document.createElement("div");
    bloco.className = "bloco-numero";
    bloco.innerText = valor;

    if (i === ativo) {
      bloco.style.background = "red";
      bloco.style.color = "white";
    } else if (lado.esquerda?.includes(i)) {
      bloco.style.background = "#a8e6cf";
    } else if (lado.direita?.includes(i)) {
      bloco.style.background = "#ffd3b6";
    } else {
      bloco.style.background = "#eee";
    }

    area.appendChild(bloco);

    if (i === meio) {
      const separador = document.createElement("div");
      separador.className = "separador-vertical";
      area.appendChild(separador);
    }
  });
}

/**
 * Desenha a pilha verticalmente.
 * @param {number[]} arr - Elementos da pilha.
 */
function desenharPilha(arr) {
  const area = document.getElementById("visualizacao");
  area.innerHTML = "";
  arr.forEach(valor => {
    const bloco = document.createElement("div");
    bloco.className = "bloco-pilha";
    bloco.innerText = valor;
    area.appendChild(bloco);
  });
}

/**
 * Executa todos os passos de um async generator e retorna o resultado final.
 * @param {AsyncGenerator} generator - Generator do algoritmo.
 * @returns {Promise<any>} Valor final do generator.
 */
async function executarCompleto(generator) {
  let res = await generator.next();
  while (!res.done) {
    res = await generator.next();
  }
  return res.value;
}

/**
 * Evento do botão "Executar": Executa o algoritmo por completo.
 */
document.getElementById("executar").onclick = async () => {
  const tipo = document.getElementById("algoritmo").value;
  generator = null;

  if (tipo === "bubble") {
    const gen = bubbleSortStep([...array], desenharArray, 300);
    array = await executarCompleto(gen);
    desenharArray(array);
  } else if (tipo === "merge") {
    const gen = mergeSortStep([...array], desenharArray, 300);
    array = await executarCompleto(gen);
    desenharArray(array);
  } else if (tipo === "busca") {
    await buscaLinear([...array], array[5], desenharArray);
  } else if (tipo === "pilha") {
    const pilha = new Pilha(desenharPilha);
    pilha.push(10);
    pilha.push(20);
    pilha.pop();
    pilha.push(30);
  } else if (tipo === "quick") {
    const gen = quickSortStep([...array], desenharArray, 300);
    array = await executarCompleto(gen);
    desenharArray(array);
  } else {
    alert("Algoritmo ainda não implementado.");
  }
};

/**
 * Mapeamento dos algoritmos disponíveis com suporte a passo a passo
 */
const algoritmosPassoAPasso = {
  bubble: (arr) => bubbleSortStep(arr, desenharArray, 0),
  merge: (arr) => mergeSortStep(arr, desenharArray, 0),
  quick: (arr) => quickSortStep(arr, desenharArray, 0),
  // Exemplo futuro:
  // heap: (arr) => heapSortStep(arr, desenharArray, 0),
};

/**
 * Evento do botão "Passo a Passo": Executa um passo por clique.
 */
document.getElementById("passo").onclick = async () => {
  const tipo = document.getElementById("algoritmo").value;

  if (!algoritmosPassoAPasso[tipo]) {
    alert("Passo a passo disponível apenas para algoritmos com suporte.");
    return;
  }

  if (!generator) {
    generator = algoritmosPassoAPasso[tipo]([...array]);
  }

  const { value, done } = await generator.next();

  if (done) {
    alert("Ordenação concluída!");
    generator = null;
    if (value) array = value;
    desenharArray(array);
  } else if (value) {
    array = value;
    desenharArray(array);
  }
};

// Desenha o array inicial ao carregar
desenharArray(array);

