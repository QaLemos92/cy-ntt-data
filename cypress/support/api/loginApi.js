class loginApi {

    login(email, password) {
        return cy.request({
            method : 'POST',
            url: `${Cypress.env('baseApiUrl')}/login`,
            body: {email, password},
            failOnStatusCode: false
        })
        .then((response) => {
            if (response.status === 200) {
                Cypress.env('token', response.body.authorization);
            }
            return response;
        });
    }
}

export default new loginApi();