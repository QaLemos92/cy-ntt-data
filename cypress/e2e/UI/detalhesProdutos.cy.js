import DetalhesDeProdutos from "../../support/pages/DetalhesDeProdutos";
import LoginPage from "../../support/pages/LoginPage";
import HomePage from "../../support/pages/HomePage";
import { criarUsuarioNormal } from "../../support/utils/geradorUsuario";

const detalhesDeProdutos = new DetalhesDeProdutos();
const loginPage = new LoginPage();
const homePage = new HomePage();

describe("Página de Detalhes dos Produtos", () => {

  beforeEach(() => {
    cy.session("usuarioLogado", () => {
      cy.visit("/login");
      cy.writeFile("cypress/fixtures/usuarios.json", criarUsuarioNormal());
      cy.fixture("usuarios").then((usuario) => {
        cy.cadastroValido(usuario.nome, usuario.email, usuario.senha);
        cy.visit("/login");
        cy.login(usuario.email, usuario.senha);
      });
    });

    cy.visit("/home");
    homePage.validarPaginaProdutos();
  });

  it("Deve visualizar os detalhes de um produto", () => {
    homePage.verDetalhesDoProduto();
    detalhesDeProdutos.validarPaginaDetalhesDoProduto();
    detalhesDeProdutos.validarDetalhesDoProduto();
  });

  it("Deve voltar para a página de produtos a partir dos detalhes do produto", () => {
    homePage.verDetalhesDoProduto();
    detalhesDeProdutos.voltarParaPaginaDeProdutos();
    homePage.validarPaginaProdutos();
  });

  

  
});
