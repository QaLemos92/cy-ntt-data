
import loginApi from "../../support/api/loginApi";
import usuarioApi from "../../support/api/usuariosApi";
import { criarUsuario } from "../../support/utils/geradorUsuario";

describe("Fluxo de Usuário via API", () => {
  let usuario;

  beforeEach(() => {
    usuario = criarUsuario()
  });

  it("Não deve permitir criar usuário ja existente", () => {
    usuarioApi.criarUsuario(usuario)

      .then((response) => {
        expect(response.status).to.eq(400)
      })
  });

  it('Não deve criar usuário sem e-mail', () => {
    delete usuario.email;

    
    usuarioApi.criarUsuario(usuario)
    .then((response) => {
      expect(response.status).to.eq(400)
      cy.log(response.body.email)
    })
  });

  it('Não deve criar usuário sem senha', () => {
    delete usuario.password;

    
    usuarioApi.criarUsuario(usuario)
    .then((response) => {
      expect(response.status).to.eq(400)
      cy.log(response.body.password)
    })
  });
});
