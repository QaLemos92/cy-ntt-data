Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-testid="email"]').type(username);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="login-button"]').click();
});