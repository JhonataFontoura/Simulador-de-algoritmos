/**
 * Função utilitária para criar uma pausa (delay) em milissegundos.
 * @param {number} ms - Tempo em milissegundos para pausar.
 * @returns {Promise<void>} Promessa que resolve após o tempo.
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Async generator para Bubble Sort que permite executar o algoritmo passo a passo.
 * A cada passo, o array é yieldado para visualização.
 * @param {number[]} arr - Array de números para ordenar.
 * @param {function} desenhar - Função para atualizar visualização do array.
 * @param {number} delayTime - Tempo de pausa entre passos para animação (ms).
 * @yields {number[]} Estado atual do array a cada passo.
 */
export async function* bubbleSortStep(arr, desenhar, delayTime = 800) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Troca elementos adjacentes fora de ordem
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        desenhar([...arr], j, j + 1);
      }
      yield [...arr]; // Pausa e retorna o estado atual do array
      if (delayTime > 0) await delay(delayTime); // Pausa para animação se delay > 0
    }
  }
}

/**
 * Async generator para Merge Sort que permite passo a passo via generators internos.
 * @param {number[]} array - Array de números para ordenar.
 * @param {function} desenhar - Função para atualizar visualização do array.
 * @param {number} delayTime - Tempo de pausa entre passos (ms).
 * @yields {number[]} Estado atual do array em cada passo do merge.
 */
export async function* mergeSortStep(array, desenhar, delayTime = 800) {
  yield* dividir(array, 0, array.length - 1, desenhar, delayTime);
}

/**
 * Função recursiva para dividir o array em subarrays, yieldando seus passos.
 * @param {number[]} array - Array a ser ordenado.
 * @param {number} esquerda - Índice esquerdo do subarray.
 * @param {number} direita - Índice direito do subarray.
 * @param {function} desenhar - Função para visualização.
 * @param {number} delayTime - Pausa entre passos.
 */
async function* dividir(array, esquerda, direita, desenhar, delayTime) {
  if (esquerda >= direita) return;

  const meio = Math.floor((esquerda + direita) / 2);

  // Divide recursivamente a esquerda e direita
  yield* dividir(array, esquerda, meio, desenhar, delayTime);
  yield* dividir(array, meio + 1, direita, desenhar, delayTime);

  // Mescla os subarrays ordenados
  yield* mesclar(array, esquerda, meio, direita, desenhar, delayTime);
}

/**
 * Função que mescla dois subarrays ordenados, yieldando o estado a cada passo.
 * @param {number[]} array - Array principal sendo ordenado.
 * @param {number} esquerda - Índice inicial do subarray esquerdo.
 * @param {number} meio - Índice do meio, separando os dois subarrays.
 * @param {number} direita - Índice final do subarray direito.
 * @param {function} desenhar - Função para atualizar visualização.
 * @param {number} delayTime - Pausa entre passos.
 */
async function* mesclar(array, esquerda, meio, direita, desenhar, delayTime) {
  const ladoEsquerdo = array.slice(esquerda, meio + 1);
  const ladoDireito = array.slice(meio + 1, direita + 1);

  let i = 0, j = 0, k = esquerda;

  // Arrays de índices para visualização colorida
  const indicesEsquerda = Array.from({ length: meio - esquerda + 1 }, (_, idx) => esquerda + idx);
  const indicesDireita = Array.from({ length: direita - meio }, (_, idx) => meio + 1 + idx);

  // Enquanto ambos os lados tiverem elementos
  while (i < ladoEsquerdo.length && j < ladoDireito.length) {
    if (ladoEsquerdo[i] <= ladoDireito[j]) {
      array[k] = ladoEsquerdo[i++];
    } else {
      array[k] = ladoDireito[j++];
    }

    // Atualiza a visualização com destaques
    desenhar([...array], k, esquerda, direita, meio, {
      esquerda: indicesEsquerda,
      direita: indicesDireita
    });

    yield [...array]; // pausa para o passo a passo
    if (delayTime > 0) await delay(delayTime);
    k++;
  }

  // Copia o restante do lado esquerdo, se houver
  while (i < ladoEsquerdo.length) {
    array[k] = ladoEsquerdo[i++];
    desenhar([...array], k, esquerda, direita, meio, {
      esquerda: indicesEsquerda,
      direita: indicesDireita
    });
    yield [...array];
    if (delayTime > 0) await delay(delayTime);
    k++;
  }

  // Copia o restante do lado direito, se houver
  while (j < ladoDireito.length) {
    array[k] = ladoDireito[j++];
    desenhar([...array], k, esquerda, direita, meio, {
      esquerda: indicesEsquerda,
      direita: indicesDireita
    });
    yield [...array];
    if (delayTime > 0) await delay(delayTime);
    k++;
  }
}
