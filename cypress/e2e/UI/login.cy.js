import LoginPage from "../../support/pages/LoginPage";
import CadastroPage from "../../support/pages/CadastroPage";
import HomePage from "../../support/pages/HomePage";
import { criarUsuarioNormal} from "../../support/utils/geradorUsuario";

const loginPage = new LoginPage();
const cadastroPage = new CadastroPage();
const homePage = new HomePage();

describe("Pagina de login", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.writeFile("cypress/fixtures/usuarios.json", criarUsuarioNormal());
  });

  it("Tenta logar sem usuário", () => {
    cy.fixture("usuarios").then((usuario) => {
      loginPage.prencherEmail(usuario.email);
      loginPage.prencherSenha(usuario.senha);
    });
    loginPage.clicarEntrar();
    loginPage.verificarAlerta("Email e/ou senha inválidos");
  });

  it("Cadastra novo usuário com sucesso - realiza login - desloga", () => {
    cy.fixture("usuarios").then((usuario) => {
      cadastroPage.acessarCadastro();
      cadastroPage.validarPaginaDeCadastro();
      cadastroPage.preencherNome(usuario.nome);
      cadastroPage.preencherEmail(usuario.email);
      cadastroPage.preencherSenha(usuario.senha);
      cadastroPage.clicarCadastrar();

      homePage.validarPaginaProdutos();
      homePage.deslogarUsuario();
      loginPage.validarPaginaDeLogin();

      cy.loginAdmin(usuario.email, usuario.senha);
      homePage.deslogarUsuario();
    });
  });
});
