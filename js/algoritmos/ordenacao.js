// ordenacao.js (módulo ES6)

// Bubble Sort com visualização
export async function bubbleSort(arr, desenhar, delayTime = 800) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        desenhar([...arr], j, j + 1);
        await delay(delayTime);
      }
    }
  }
}

// Merge Sort com visualização
// Exporta a função principal de ordenação Merge Sort com visualização
export async function mergeSort(array, desenhar, delayTime = 800) {
  await dividir(array, 0, array.length - 1, desenhar, delayTime);
}

// Função recursiva que divide o array em duas partes até que cada parte tenha apenas 1 elemento
async function dividir(array, esquerda, direita, desenhar, delayTime) {
  if (esquerda >= direita) return; // Caso base: subarray com 1 elemento já está ordenado

  const meio = Math.floor((esquerda + direita) / 2); // Encontra o meio do array

  // Chamada recursiva para as duas metades
  await dividir(array, esquerda, meio, desenhar, delayTime);
  await dividir(array, meio + 1, direita, desenhar, delayTime);

  // Mescla as duas partes ordenadas
  await mesclar(array, esquerda, meio, direita, desenhar, delayTime);
}

// Função que mescla dois subarrays ordenados: [esquerda...meio] e [meio+1...direita]
async function mesclar(array, esquerda, meio, direita, desenhar, delayTime) {
  // Copia os dados de cada lado em novos arrays temporários
  const ladoEsquerdo = array.slice(esquerda, meio + 1);
  const ladoDireito = array.slice(meio + 1, direita + 1);

  let i = 0, j = 0, k = esquerda; // Índices para os arrays temporários e o original

  // Gera os índices visuais para destacar esquerda e direita
  const indicesEsquerda = Array.from({ length: meio - esquerda + 1 }, (_, idx) => esquerda + idx);
  const indicesDireita = Array.from({ length: direita - meio }, (_, idx) => meio + 1 + idx);

  // Enquanto ambos os lados ainda têm elementos
  while (i < ladoEsquerdo.length && j < ladoDireito.length) {
    if (ladoEsquerdo[i] <= ladoDireito[j]) {
      array[k] = ladoEsquerdo[i++];
    } else {
      array[k] = ladoDireito[j++];
    }

    // Desenha o array com destaques:
    // - k = posição sendo escrita (vermelho)
    // - esquerda e direita = faixas do merge (cores diferentes)
    // - meio = separação com margem
    desenhar([...array], k, esquerda, direita, meio, {
      esquerda: indicesEsquerda,
      direita: indicesDireita
    });

    await delay(delayTime); // Pausa para visualização
    k++;
  }

  // Copia qualquer elemento restante do lado esquerdo
  while (i < ladoEsquerdo.length) {
    array[k] = ladoEsquerdo[i++];
    desenhar([...array], k, esquerda, direita, meio, {
      esquerda: indicesEsquerda,
      direita: indicesDireita
    });
    await delay(delayTime);
    k++;
  }

  // Copia qualquer elemento restante do lado direito
  while (j < ladoDireito.length) {
    array[k] = ladoDireito[j++];
    desenhar([...array], k, esquerda, direita, meio, {
      esquerda: indicesEsquerda,
      direita: indicesDireita
    });
    await delay(delayTime);
    k++;
  }
}

// Função utilitária que gera uma pausa em milissegundos
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
