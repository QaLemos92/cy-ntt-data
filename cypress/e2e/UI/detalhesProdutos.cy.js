import DetalhesDeProdutos from "../../support/pages/DetalhesDeProdutos";
import LoginPage from "../../support/pages/LoginPage";
import HomePage from "../../support/pages/HomePage";
import { criarUsuario } from "../../support/utils/geradorUsuario";

const detalhesDeProdutos = new DetalhesDeProdutos();
const loginPage = new LoginPage();
const homePage = new HomePage();

describe("Página de Detalhes dos Produtos", () => {
  let usuario;

  beforeEach(() => {
    usuario = criarUsuario();
    cy.visit("/cadastrarusuarios");

    cy.cadastroValido(usuario.nome, usuario.email, usuario.senha);
    
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
