import { faker } from "@faker-js/faker";

export function criarProduto() {
  return {
    nome: faker.commerce.productName(),
    preco: Number(faker.commerce.price({ min: 5, max: 999, dec: 0})),
    descricao: faker.commerce.productDescription(),
    quantidade: Number(faker.commerce.price({ min: 10, max: 50, dec: 0}))
  };
}


