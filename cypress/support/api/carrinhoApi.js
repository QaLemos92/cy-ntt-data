class CarrinhoApi {

    listarCarrinho(){
        return cy.request({
            method: "GET",
            url: `${Cypress.env("baseApiUrl")}/carrinhos`,
            headers: {
                Authorization: Cypress.env("token"),
            },
            failOnStatusCode: false,
        });
    }

    adicionarCarrinho(dados) {
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