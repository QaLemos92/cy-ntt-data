class LoginPage {

    elementos = {
        campo_email: () => cy.get('#email'),
        campo_senha: () => cy.get('#password'),
        botao_entrar: () => cy.get('[data-testid="entrar"]'),
        link_cadastrar: () => cy.get('[data-testid="cadastrar"]'),
        alert: () => cy.get('.alert'),
    }

    acessarLogin() {
        cy.visit('/login');
    }

    prencherEmail(email) {
        this.elementos.campo_email().type(email);
    }

    prencherSenha(senha) {
        this.elementos.campo_senha().type(senha);
    }

    clicarEntrar() {
        this.elementos.botao_entrar().click();
    }

    clicarCadastrar() {
        this.elementos.link_cadastrar().click();
    }

    verificarAlerta(mensagem) {
        this.elementos.alert().should('contain', mensagem);
    }
}

export default LoginPage;