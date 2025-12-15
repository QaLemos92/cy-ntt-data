import produtosApi from "../../support/api/produtosApi";
import carrinhoApi from "../../support/api/carrinhoApi";
import { criarUsuario } from "../../support/utils/geradorUsuario";
import { criarProduto } from "../../support/utils/geradorProduto";

describe("API - Carrinho de Compras", () => {
  let usuario;
  let estoqueInicial;
  let estoqueAlterado;
  let novoProduto;
  let produto_Id;

  beforeEach(() => {
    usuario = criarUsuario();
    novoProduto = criarProduto();

    cy.cadastroApi(usuario.nome, usuario.email, usuario.senha, "true")
    .then(() => {
      return cy
        .loginApi(usuario.email, usuario.senha)

        .then((loginResponse) => {
          Cypress.env("token", loginResponse.body.authorization);
        })

        .then(() => {
          return produtosApi
            .criarProduto(novoProduto)

            .then((response) => {
              produto_Id = response.body._id;
              estoqueInicial = novoProduto.quantidade;
            });
        });
    });
  });

  afterEach(() => {
    carrinhoApi.deletarCarrinho();
  });

  it("Deve reduzir estoque do produto ao cadastrar carrinho", () => {
    //cria um carrinho e coloca todo o produto novo dentro
    carrinhoApi
      .adicionarCarrinho(produto_Id, novoProduto.quantidade)

      .then((response) => {
        expect(response.status).to.eq(201);
        carrinhoId = response.body._id;
      });

    produtosApi
      .buscarProdutoPorId(produto_Id)
      .then((response) => {
        estoqueAlterado = response.body.quantidade;
      })

      .then(() => {
        expect(estoqueAlterado).to.be.lessThan(estoqueInicial);
      })
      
      .then(() => {
        carrinhoApi.deletarCarrinho().then(() => {
          expect(estoqueAlterado).to.be.lessThan(estoqueInicial);
        });
      });
  });

  it("Não deve permitir manipular carrinho de outro usuário", () => {
    let usuarioIntruso;
    let tokenIntruso;

    carrinhoApi
      .adicionarCarrinho(produto_Id, novoProduto.quantidade)

      .then((response) => {
        expect(response.status).to.eq(201);
        carrinhoId = response.body._id;
      })

      .then(() => {
        usuarioIntruso = criarUsuario();
        return cy.cadastroApi(
          usuarioIntruso.nome,
          usuarioIntruso.email,
          usuarioIntruso.senha,
          "false"
        );
      })

      .then(() => {
        return cy.loginApi(usuarioIntruso.email, usuarioIntruso.senha);
      })

      .then((loginResponse) => {
        tokenIntruso = loginResponse.body.authorization;
        cy.log(tokenIntruso);
        Cypress.env("token", tokenIntruso);

        cy.log("Usuario normal" + usuario.nome);
        cy.log("Usuário intruso: " + usuarioIntruso.nome);
      })

      .then(() => {
        return carrinhoApi.deletarCarrinho();
      })

      // Aqui não deveria deixar deletar o carrinho: risco de segurança
      .then((response) => {
        expect(response.status).to.not.eq(200);
      })

      .then(() => {
        Cypress.env("token", Cypress.env("token"));
        return carrinhoApi.listarCarrinho();
      })

      .then((response) => {
        expect(response.body.quantidade).to.eq(1);
      });
  });

  it("Deve retornar status 401 ao acessar carrinho sem autenticação", () => {
    Cypress.env("token", null);

    carrinhoApi
      .adicionarCarrinho(produto_Id, novoProduto.quantidade)

      .then((response) => {
        expect(response.status).to.eq(401);
      });
  });
});
