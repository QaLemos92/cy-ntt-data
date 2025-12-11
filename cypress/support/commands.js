Cypress.Commands.add('cadastroValido', () => {
    cy.get('[data-testid="cadastrar"]').click();
    cy.get('#nome').type('Eduardo Lemos');
    cy.get('#email').type('eduardo.anemolos@outlook.com');
    cy.get('#password').type('123456');
    cy.get('[data-testid="cadastrar"]').click();
    cy.visit('/login');
});

Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-testid="email"]').type(username);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="login-button"]').click();
});