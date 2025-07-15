// algoritmos/estrutura.js

export class Pilha {
  constructor(desenhar) {
    this.items = [];
    this.desenhar = desenhar;
    this.desenhar(this.items);
  }

  push(elemento) {
    this.items.push(elemento);
    this.desenhar(this.items);
  }

  pop() {
    if (this.items.length === 0) return null;
    const retirado = this.items.pop();
    this.desenhar(this.items);
    return retirado;
  }

  topo() {
    return this.items[this.items.length - 1];
  }

  estaVazia() {
    return this.items.length === 0;
  }
}
