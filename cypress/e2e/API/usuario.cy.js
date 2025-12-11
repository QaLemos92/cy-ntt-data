import loginApi from "../../support/api/loginApi";
import usuarioApi from "../../support/api/usuariosApi";

describe("Fluxo de Usuário via API", () => {
  it("Criar usuario, logar e deletar", () => {
    const email = `usuario${Date.now()}@teste.com`;

    //Criando usuário
    usuarioApi
      .criarUsuario({
        nome: "Eduardo Teste",
        email: email,
        password: "senha1",
        administrador: "false",
      })
      .then((response) => {
        expect(response.status).to.eq(201);
        const usuarioId = response.body._id;

        //Logando com o usuário criado
        loginApi.login(email, "senha1").then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.authorization).to.exist;

          //Deletando o usuário criado
          usuarioApi.deletarUsuario(usuarioId).then((response) => {
            expect(response.status).to.eq(200);
          });
        });
      });
  });
});
