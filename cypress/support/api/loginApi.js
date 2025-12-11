class loginApi {

    login(email, password) {
        return cy.request('POST', '/login', {email, password});
    }
}

export default new loginApi();