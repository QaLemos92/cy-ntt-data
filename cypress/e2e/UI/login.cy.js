import LoginPage from "../../support/pages/LoginPage";
import CadastroPage from "../../support/pages/CadastroPage";
import HomePage from "../../support/pages/HomePage";
import HeaderPage from "../../support/pages/HeaderPage"
import { criarUsuarioNormal } from "../../support/utils/geradorUsuario";

const loginPage = new LoginPage();
const cadastroPage = new CadastroPage();
const homePage = new HomePage();
const header = new HeaderPage();
let usuario;

describe("Pagina de login", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.writeFile("cypress/fixtures/usuarios.json", criarUsuarioNormal());
    usuario = criarUsuarioNormal();
  });

  it("Login com credenciais inválidas", () => {
    loginPage.prencherEmail(usuario.email);
    loginPage.prencherSenha(usuario.senha);
    loginPage.clicarEntrar();
    loginPage.verificarAlerta("Email e/ou senha inválidos");
  });

  it("Cadastra novo usuário com sucesso - realiza login - desloga", () => {
    cadastroPage.acessarCadastro();
    cadastroPage.validarPaginaDeCadastro();
    cadastroPage.preencherNome(usuario.nome);
    cadastroPage.preencherEmail(usuario.email);
    cadastroPage.preencherSenha(usuario.senha);
    cadastroPage.clicarCadastrar();

    homePage.validarPaginaProdutos();
    header.realizaLogout()
    loginPage.validarPaginaDeLogin();
  });
});
