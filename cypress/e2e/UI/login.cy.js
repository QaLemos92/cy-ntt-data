import LoginPage from '../../support/pages/LoginPage'
import CadastroPage from '../../support/pages/CadastroPage';
import HomePage from '../../support/pages/HomePage';


const loginPage = new LoginPage();
const cadastroPage = new CadastroPage();
const homePage = new HomePage();

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

    it.only('Cadastra novo usuário com sucesso', () => {
        cadastroPage.acessarCadastro();
        cadastroPage.validarPaginaDeCadastro();
        cadastroPage.preencherNome();
        cadastroPage.preencherEmail();
        cadastroPage.preencherSenha();
        cadastroPage.clicarCadastrar();

    })

    it('Loga com usuário válido', () => {
        cy.cadastroValido();
        loginPage.prencherEmail('eduardo.anemolos@outlook.com')
        loginPage.prencherSenha('123456');
        loginPage.clicarEntrar();
    });

    it('Deve deslogar usuário logado', () => {
        cy.login('eduardo.anemolos@outlook.com','123456');
        homePage.validarPaginaProdutos();
        homePage.deslogarUsuario();
        loginPage.validarPaginaDeLogin();
    });

})