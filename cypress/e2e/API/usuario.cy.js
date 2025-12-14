import loginApi from "../../support/api/loginApi";
import usuarioApi from "../../support/api/usuariosApi";
import { criarUsuarioAdmin } from "../../support/utils/geradorUsuario";

describe("Fluxo de Usuário via API", () => {
  beforeEach(() => {
    cy.writeFile("cypress/fixtures/usuarios.json", criarUsuarioAdmin());
  });

  it("Deve criar usuario com sucesso e impedir outro cadastro com mesmo e-mail", () => {
    cy.fixture("usuarios").then((usuario) => {
      usuarioApi
        .criarUsuario({
          nome: usuario.nome,
          email: usuario.email,
          password: usuario.senha,
          administrador: usuario.administrador,
        })
        .then((response) => {
          expect(response.status).to.eq(201);
        });
      usuarioApi.criarUsuario({
          nome: usuario.nome,
          email: usuario.email,
          password: usuario.senha,
          administrador: usuario.administrador,
        })
        .then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).to.eq("Este email já está sendo usado");
        });
    });
  });
});
