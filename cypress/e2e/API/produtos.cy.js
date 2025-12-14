import produtosApi from "../../support/api/produtosApi";
import { criarProduto } from "../../support/utils/geradorProduto";
import { criarUsuarioAdmin } from "../../support/utils/geradorUsuario";

describe("Fluxo de Produtos", () => {
  let usuario;
  let produto;

  beforeEach(() => {
    usuario = criarUsuarioAdmin();
    produto = criarProduto();

    cy.writeFile("cypress/fixtures/usuarios.json", criarUsuarioAdmin());
    cy.writeFile("cypress/fixtures/produtos.json", criarProduto());

    cy.cadastroApiAdmin(usuario.nome, usuario.email, usuario.senha);

    cy.loginApi(usuario.email, usuario.senha);
  });

  it("Deve listar produtos", () => {
    produtosApi.listarProdutos().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.produtos).to.be.an("array");
    });
  });

  it.only("Deve criar e deletar um produto", () => {
    const novoProduto = {
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao,
      quantidade: produto.quantidade,
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
