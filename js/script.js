// Importa os algoritmos de ordenação, busca e estrutura de dados da pasta algoritmos
import { bubbleSort, mergeSort } from './algoritmos/ordenacao.js';
import { buscaLinear } from './algoritmos/busca.js';
import { Pilha } from './algoritmos/estrutura.js';

// Gera um array aleatório de 20 números para testar os algoritmos
let array = gerarArray(20);
// Desenha inicialmente o array na tela
desenharArray(array);

/**
 * Gera um array com 'tamanho' números inteiros aleatórios entre 0 e 99
 * @param {number} tamanho - Quantidade de números no array (default 10)
 * @returns {number[]} Array com valores aleatórios
 */
function gerarArray(tamanho = 10) {
  return Array.from({ length: tamanho }, () => Math.floor(Math.random() * 100));
}

/**
 * Função para desenhar um array na tela, mostrando números dentro de blocos coloridos
 * @param {number[]} arr - Array de números para desenhar
 * @param {number} ativo - índice do elemento ativo (em destaque vermelho), default -1 (nenhum)
 * @param {number} inicio - índice início do intervalo destacado (lado esquerdo), default -1 (nenhum)
 * @param {number} fim - índice fim do intervalo destacado (lado direito), default -1 (nenhum)
 * @param {number} meio - índice onde colocamos o separador vertical
 * @param {object} lado - objeto com arrays 'esquerda' e 'direita' para colorir intervalos (ex: {esquerda: [...], direita: [...]})
 */
function desenharArray(arr, ativo = -1, inicio = -1, fim = -1, meio = -1, lado = {}) {
  const area = document.getElementById("visualizacao");
  area.innerHTML = ""; // limpa a visualização atual

  arr.forEach((valor, i) => {
    const bloco = document.createElement("div");
    bloco.className = "bloco-numero"; // aplica estilo do CSS

    bloco.innerText = valor; // exibe o número dentro do bloco

    // Define cores diferentes conforme posição no array
    if (i === ativo) {
      // Elemento ativo destacado em vermelho
      bloco.style.background = "red";
      bloco.style.color = "white";
    } else if (lado.esquerda?.includes(i)) {
      // Lado esquerdo da divisão destacado em verde claro
      bloco.style.background = "#a8e6cf";
      bloco.style.color = "#333";
    } else if (lado.direita?.includes(i)) {
      // Lado direito da divisão destacado em laranja claro
      bloco.style.background = "#ffd3b6";
      bloco.style.color = "#333";
    } else {
      // Elementos neutros com fundo cinza claro
      bloco.style.background = "#eee";
      bloco.style.color = "#333";
    }

    area.appendChild(bloco);

    // Cria a barra separadora vertical após o índice 'meio'
    if (i === meio) {
      const separador = document.createElement("div");
      separador.className = "separador-vertical";
      area.appendChild(separador);
    }
  });
}

/**
 * Função para desenhar uma pilha visualmente (usada no algoritmo da pilha)
 * @param {number[]} arr - Array com valores da pilha
 */
function desenharPilha(arr) {
  const area = document.getElementById("visualizacao");
  area.innerHTML = ""; // limpa visualização

  arr.forEach((valor) => {
    const bloco = document.createElement("div");
    bloco.className = "bloco-pilha";
    bloco.innerText = valor; // mostra valor da pilha
    area.appendChild(bloco);
  });
}

// Configura o evento do botão "executar" para rodar o algoritmo selecionado
document.getElementById("executar").onclick = async () => {
  const tipo = document.getElementById("algoritmo").value;
  console.log("Executando algoritmo:", tipo);

  if (tipo === "bubble") {
    console.log("Chamado bubbleSort");
    // Chama o bubbleSort passando uma cópia do array e a função desenharArray para animação
    await bubbleSort([...array], desenharArray);
  } else if (tipo === "merge") {
    console.log("Chamado mergeSort");
    // Chama mergeSort com array e função desenharArray para animação
    await mergeSort([...array], desenharArray);
  } else if (tipo === "busca") {
    console.log("Chamado buscaLinear");
    // Busca linear para o valor do índice 5 do array, animando com desenharArray
    await buscaLinear([...array], array[5], desenharArray);
  } else if (tipo === "pilha") {
    console.log("Manipulando pilha");
    // Cria uma pilha, executa push e pop para demonstração visual
    const pilha = new Pilha(desenharPilha);
    pilha.push(10);
    pilha.push(20);
    pilha.pop();
    pilha.push(30);
  } else {
    console.log("Nenhum algoritmo selecionado");
  }
};
