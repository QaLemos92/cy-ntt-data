class CadastroPage {

    elementos = {
        form: () => cy.get('.form'),
        campo_nome: () => cy.get('[data-testid="nome"]'),
        campo_email: () => cy.get('[data-testid="email"]'),
        campo_senha: () => cy.get('[data-testid="password"]'),
        botao_cadastrar: () => cy.get('[data-testid="cadastrar"]'),
        alert: () => cy.get('.alert'),
    }

    acessarCadastro() {
        cy.get('[data-testid="cadastrar"]').click();
    }

    validarPaginaDeCadastro() {
        cy.url().should('include', '/cadastrarusuarios');
        this.elementos.form().should('be.visible');
    }

    preencherNome(nome) {
        this.elementos.campo_nome().type(nome);

    }

    preencherEmail(email) {
        this.elementos.campo_email().type(email);
    }

    preencherSenha(senha) {
        this.elementos.campo_senha().type(senha);
    }

    clicarCadastrar() {
        this.elementos.botao_cadastrar().click();
    }

    validarMensagem(mensagem) {
        this.elementos.alert().should('contain', mensagem);
    }
}

export default CadastroPage;