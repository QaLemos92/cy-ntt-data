import produtosApi from "../../support/api/produtosApi";
import { criarProduto } from "../../support/utils/geradorProduto";
import {
  criarUsuario
} from "../../support/utils/geradorUsuario";

describe("Fluxo de Produtos", () => {
  let usuario;
  let produto;

  beforeEach(() => {
    usuario = criarUsuario();
    produto = criarProduto();

    cy.cadastroApi(usuario.nome, usuario.email, usuario.senha, "true")

    .then(() => {
      return cy.loginApi(usuario.email, usuario.senha);
    })

    .then((loginResponse) => {
      Cypress.env("token", loginResponse.body.authorization)
    })

    
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

    usuario = criarUsuario();
    cy.cadastroApi(usuario.nome, usuario.email, usuario.senha)

    .then(() => {
      return cy.loginApi(usuario.email, usuario.senha)
    })

    .then((loginResponse) => {
      Cypress.env("token", loginResponse.body.authorization);
    })

    .then(() => {
      produtosApi.criarProduto(novoProduto).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body.message).to.eq("Rota exclusiva para administradores")
      });
    })
  });

  it("Deve falhar criação por token inválido", () => {
    const novoProduto = {
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao,
      quantidade: produto.quantidade,
    };
    const tokenOriginal = Cypress.env("token");
    const tokenInvalido = `${tokenOriginal}INVALIDO`;

    Cypress.env("token", tokenInvalido);

    produtosApi.criarProduto(novoProduto).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq(
        "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
      );
    })

    .then(() => {
      Cypress.env("token", tokenOriginal)
    })
  });
});
