class CarrinhoApi {

    criarCarrinho(dados) {
        return cy.request({
            method: "POST",
            url: `${Cypress.env("baseApiUrl")}/carrinhos`,
            headers: {
                Authorization: Cypress.env("token"),
            },
            body: dados,
            failOnStatusCode: false,
        });
    }

    deletarCarrinho(carrinhoId) {
        return cy.request({
            method: "DELETE",
            url: `${Cypress.env("baseApiUrl")}/carrinhos/${carrinhoId}`,
            headers: {
                Authorization: Cypress.env("token"),
            },
            failOnStatusCode: false,
        });
    }
}

export default new CarrinhoApi();