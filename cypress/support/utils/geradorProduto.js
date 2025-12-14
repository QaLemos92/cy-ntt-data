import { faker } from "@faker-js/faker";

export function criarProduto() {
  return {
    nome: faker.commerce.productName(),
    preco: faker.commerce.price({ min: 5, max: 999, dec: 0, symbol: 'R$' }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.commerce.price({ min: 10, max: 50, dec: 0})
  };
}


