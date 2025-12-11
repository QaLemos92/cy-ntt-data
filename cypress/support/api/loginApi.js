class loginApi {

    login(email, password) {
        return cy.request('POST', `${Cypress.env('baseApiUrl')}/login`, {email, password});
    }
}

export default new loginApi();