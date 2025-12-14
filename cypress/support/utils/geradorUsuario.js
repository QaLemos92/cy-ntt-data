import { faker } from "@faker-js/faker";

export function criarUsuarioNormal() {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
  };
}

export function criarUsuarioAdmin() {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
    administrador: "true",
  };
}
