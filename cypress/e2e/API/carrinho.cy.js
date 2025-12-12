import produtosApi from "../../support/api/produtosApi";
import carrinhoApi from "../../support/api/carrinhoApi";

import cadastroApi from "../../support/api/cadastroApi";

describe("API - Carrinho de Compras", () => {

  beforeEach(() => {
    cy.loginApi("eduardo.anemolos@outlook.com", "123456");
  });

    it("Deve adicionar carrinho", () => {
    produtosApi.listarProdutos().then((response) => {
      const produtoId = response.body.produtos[0]._id;

      carrinhoApi
        .adicionarCarrinho({
          produtos: [
            {
              idProduto: produtoId,
              quantidade: 2,
            },
          ],
        })
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.message).to.eq("Cadastro realizado com sucesso");
          cy.log(response.body._id);
        });
    });
  });

  it("Deve deletar carrinho", () => {
    carrinhoApi.deletarCarrinho().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Registro excluído com sucesso. Estoque dos produtos reabastecido" || "Não foi encontrado carrinho para esse usuário");
    });
  });


});
