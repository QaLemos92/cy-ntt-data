import LoginPage from '../../pages/LoginPage';
import CadastroPage from '../../pages/CadastroPage';

const loginPage = new LoginPage();
const cadastroPage = new CadastroPage();

describe('Pagina de login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('Tenta logar sem usuário', () => {
        loginPage.prencherEmail('usuario@invalido.com')
        loginPage.prencherSenha('senhaInvalida');
        loginPage.clicarEntrar();
        loginPage.verificarAlerta('Email e/ou senha inválidos');
    });

    it('Cadastra novo usuário com sucesso', () => {

        cy.intercept('POST', '/usuarios',{
            statusCode: 201,
            body: { message: 'Cadastro realizado com sucesso' }
        }).as('cadastroSucesso');

        cadastroPage.acessarCadastro();
        cadastroPage.validarPaginaDeCadastro();
        cadastroPage.preencherNome('Eduardo Anemolos');
        cadastroPage.preencherEmail('novo-email@hotmail.com');
        cadastroPage.preencherSenha('senha123');
        cadastroPage.clicarCadastrar();

        cy.wait('@cadastroSucesso').its('response.statusCode').should('eq', 201);
        cadastroPage.validarMensagem('Cadastro realizado com sucesso');
    })

    it('Loga com usuário válido', () => {
        cy.cadastroValido();
        loginPage.prencherEmail('eduardo.anemolos@outlook.com')
        loginPage.prencherSenha('123456');
        loginPage.clicarEntrar();
    });
})