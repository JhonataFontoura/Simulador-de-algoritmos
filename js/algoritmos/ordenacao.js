// ordenacao.js (módulo ES6)

// Bubble Sort com visualização
export async function bubbleSort(arr, desenhar, delayTime = 300) {
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
export async function mergeSort(arr, desenhar, delayTime = 300) {
  await mergeSortRec(arr, 0, arr.length - 1, desenhar, delayTime);
}

async function mergeSortRec(arr, esquerda, direita, desenhar, delayTime) {
  if (esquerda >= direita) return;

  const meio = Math.floor((esquerda + direita) / 2);
  await mergeSortRec(arr, esquerda, meio, desenhar, delayTime);
  await mergeSortRec(arr, meio + 1, direita, desenhar, delayTime);
  await merge(arr, esquerda, meio, direita, desenhar, delayTime);
}

async function merge(arr, esquerda, meio, direita, desenhar, delayTime) {
  const esquerdaArr = arr.slice(esquerda, meio + 1);
  const direitaArr = arr.slice(meio + 1, direita + 1);

  let i = 0, j = 0, k = esquerda;

  while (i < esquerdaArr.length && j < direitaArr.length) {
    if (esquerdaArr[i] <= direitaArr[j]) {
      arr[k] = esquerdaArr[i++];
    } else {
      arr[k] = direitaArr[j++];
    }
    desenhar([...arr], k);
    await delay(delayTime);
    k++;
  }

  while (i < esquerdaArr.length) {
    arr[k] = esquerdaArr[i++];
    desenhar([...arr], k);
    await delay(delayTime);
    k++;
  }

  while (j < direitaArr.length) {
    arr[k] = direitaArr[j++];
    desenhar([...arr], k);
    await delay(delayTime);
    k++;
  }
}

// Utilitário para delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
