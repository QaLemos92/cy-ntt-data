class CarrinhoApi {
  listarCarrinho(params ={}) {
    return cy.request({
      method: "GET",
      url: `${Cypress.env("baseApiUrl")}/carrinhos`,
      qs: params,
      headers: {
        Authorization: Cypress.env("token"),
      },
      failOnStatusCode: false,
    });
  }

  buscarCarrinho(carrinhoId) {
    return cy.request({
      method: "DELETE",
      url: `${Cypress.env("baseApiUrl")}/carrinhos/${carrinhoId}`,
      headers: {
        Authorization: Cypress.env("token"),
      },
      failOnStatusCode: false,
    });
  }

  adicionarCarrinho(produtoId, quantidade) {
    return cy.request({
      method: "POST",
      url: `${Cypress.env("baseApiUrl")}/carrinhos`,
      headers: {
        Authorization: Cypress.env("token"),
      },
      body: {
        produtos: [
          {
            idProduto: produtoId,
            quantidade: quantidade,
          },
        ],
      },
      failOnStatusCode: false,
    });
  }

  deletarCarrinho() {
    return cy.request({
      method: "DELETE",
      url: `${Cypress.env("baseApiUrl")}/carrinhos/cancelar-compra`,
      headers: {
        Authorization: Cypress.env("token"),
      },
      failOnStatusCode: false,
    });
  }
}

export default new CarrinhoApi();
