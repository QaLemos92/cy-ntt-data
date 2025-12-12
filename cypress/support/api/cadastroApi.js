class CadastroApi {

    cadastroUsuario(dados) {
        return cy.request({
            method: "POST",
            url: `${Cypress.env("baseApiUrl")}/usuarios`,
            body: dados,
            failOnStatusCode: false,
        });
    }
}

export default new CadastroApi();