import produtosApi from "../../support/api/produtosApi";
import { criarProduto } from "../../support/utils/geradorProduto";
import {
  criarUsuarioAdmin,
  criarUsuarioNormal,
} from "../../support/utils/geradorUsuario";

describe("Fluxo de Produtos", () => {
  let usuario;
  let produto;

  beforeEach(() => {
    usuario = criarUsuarioAdmin();
    produto = criarProduto();

    cy.writeFile("cypress/fixtures/usuarios.json", criarUsuarioAdmin());
    cy.writeFile("cypress/fixtures/produtos.json", criarProduto());

    cy.cadastroApi(usuario.nome, usuario.email, usuario.senha);

    cy.loginApi(usuario.email, usuario.senha);
  });

  it("Deve listar produtos", () => {
    produtosApi.listarProdutos().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.produtos).to.be.an("array");
    });
  });

  it("Deve falhar busca de produto com parâmetro errado", () => {
    produtosApi.listarProdutos({ preco: "abc" }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.preco).to.eq("preco deve ser um número");
    });
  });

  it("Deve trazer lista vazia e não falhar", () => {
    produtosApi.listarProdutos({ nome: usuario.nome }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.quantidade).to.eq(0);
    });
  });

  it("Deve criar e deletar um produto", () => {
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

  it("Deve impedir a criação de produto por usuario normal", () => {
    const novoProduto = {
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao,
      quantidade: produto.quantidade,
    };

    usuario = criarUsuarioNormal();
    cy.cadastroApi(usuario.nome, usuario.email, usuario.senha, "false");
    produtosApi.criarProduto(novoProduto).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("Deve falhar criação por token inválido", () => {
    const novoProduto = {
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao,
      quantidade: produto.quantidade,
    };
    const tokenValido = Cypress.env("token");
    const tokenInvalido = `${tokenValido}INVALIDO`;

    Cypress.env("token", tokenInvalido);

    produtosApi.criarProduto(novoProduto).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq(
        "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
      );
    });
  });
});
