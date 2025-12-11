
describe('Pagina de login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('Tenta logar sem usuário', () => {
        cy.get('#email').type('email@inexistente.com');
        cy.get('#password').type('senhaIncorreta');
        cy.get('[data-testid="entrar"]').click();
        cy.get('.alert').should('contain', 'Email e/ou senha inválidos');
    });

    it('Cadastra novo usuário e loga com sucesso', () => {

        cy.intercept('POST', '/usuarios',{
            statusCode: 201,
            body: { message: 'Cadastro realizado com sucesso' }
        }).as('cadastroSucesso');

        cy.get('[data-testid="cadastrar"]').click();
        cy.url().should('include', '/cadastrarusuarios');
        cy.get('.form').should('be.visible');
        cy.get('#nome').type('Eduardo Lemos');
        cy.get('#email').type('usuario' + Date.now()+'@teste.com');
        cy.get('#password').type('senhaTeste');
        cy.get('[data-testid="cadastrar"]').click();

        cy.wait('@cadastroSucesso').its('response.statusCode').should('eq', 201);
        cy.get('.alert').should('contain', 'Cadastro realizado com sucesso');
    })

    it.only('Loga com usuário válido', () => {
        cy.get('#email').type('eduardo.anemolos@outlook.com');
        cy.get('#password').type('123456');
        cy.get('[data-testid="entrar"]').click();
        cy.url().should('include', '/home');

    });
})