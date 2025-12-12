class ProdutosApi {
  criarProduto(dados) {
    return cy.request({
      method: "POST",
      url: `${Cypress.env("baseApiUrl")}/produtos`,
      headers: {
        Authorization: Cypress.env("token"),
      },
      body: dados,
      failOnStatusCode: false,
    });
  }

  listarProdutos() {
    return cy.request("GET", `${Cypress.env("baseApiUrl")}/produtos`);
  }

  deletarProduto(produtoId) {
    return cy.request({
      method: "DELETE",
      url: `${Cypress.env("baseApiUrl")}/produtos/${produtoId}`,
      headers: {
        Authorization: Cypress.env("token"),
      },
      failOnStatusCode: false,
    });
  }
}

export default new ProdutosApi();
