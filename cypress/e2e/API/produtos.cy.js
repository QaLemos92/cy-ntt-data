import produtosApi from "../../support/api/produtosApi";

describe("Fluxo de Produtos", () => {
  beforeEach(() => {
    cy.loginApi("fulano@qa.com", "teste");
  });

  it("Deve listar produtos", () => {
    produtosApi.listarProdutos().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.produtos).to.be.an("array");
    });
  });

  it.only("Deve criar e deletar um produto", () => {
    const novoProduto = {
      nome: "produto teste " + Math.floor(Math.random() * 1000),
      preco: 55,
      descricao: "um produto muito bom pra teste",
      quantidade: 50,
    };

    produtosApi.criarProduto(novoProduto).then((response) => {
      expect(response.status).to.eq(201);
      const produtoId = response.body._id;
      cy.log(response.body.message);

      produtosApi.deletarProduto(produtoId).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body.message);
      });
    });
  });
});
