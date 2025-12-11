Cypress.Commands.add('cadastroValido', () => {
    cy.get('[data-testid="cadastrar"]').click();
    cy.get('#nome').type('Eduardo Lemos');
    cy.get('#email').type('eduardo.anemolos@outlook.com');
    cy.get('#password').type('123456');
    cy.get('[data-testid="cadastrar"]').click();
    cy.visit('/login');
});

Cypress.Commands.add('login', (username, password) => {
    cy.intercept('POST', '/login').as('requestLogin');
    cy.get('[data-testid="email"]').type(username);
    cy.get('[data-testid="senha"]').type(password);
    cy.get('[data-testid="entrar"]').click();
    cy.wait('@requestLogin').then((res) => {
        const body = res.response.body;

        if(body.authorization) {
            window.localStorage.setItem('token', body.authorization);
            return 'sucesso';
        }

        if(body.message && body.message.includes('Email e/ou senha inválidos')) {
            return 'inválido';
        }

    })

});

Cypress.Commands.add('loginOuCadastra', (nome, email, senha) => {
    cy.login(email, senha).then((response) => {
        if(response === 'sucesso') {
            return;
        }

        if(response === 'inválido') {
            cy.cadastroValido();
            cy.login(email, senha);
        }
    });
});