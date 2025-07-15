// algoritmos/busca.js

export async function buscaLinear(arr, alvo, desenhar) {
  for (let i = 0; i < arr.length; i++) {
    desenhar(arr, i); // Destaca o elemento atual
    await delay(300);
    if (arr[i] === alvo) {
      return i; // Encontrado
    }
  }
  return -1; // Nao encontrado
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
