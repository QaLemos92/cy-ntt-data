import LoginPage from "../../support/pages/LoginPage";
import HomePage from "../../support/pages/HomePage";
import DetalhesDeProdutos from "../../support/pages/DetalhesDeProdutos";
import { criarUsuarioNormal } from "../../support/utils/geradorUsuario";
import ListaDeCompras from "../../support/pages/ListaDeCompras";

const detalhesDeProdutos = new DetalhesDeProdutos();
const loginPage = new LoginPage();
const homePage = new HomePage();
const listaDeCompras = new ListaDeCompras();

describe("Página de Produtos", () => {
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

  it("Deve pesquisar por um produto específico", () => {
    homePage.pesquisarProduto("Electronic Wooden Car");
    // É esperado que não funcione como esperado
  });

  it("Deve adicionar um item aleatório na lista", () => {
    homePage.adicionarItemAleatorioNaLista();
  });

  it.only('deve cadastrar - logar - ver detalhes - adicionar na lista - aumentar quantidade - adicionar ao carrinho - deslogar', () => {
    homePage.verDetalhesDoProduto();
    detalhesDeProdutos.adicionarItemNaLista();
    listaDeCompras.ajustarQuantidade(8);
    listaDeCompras.ajustarQuantidade(5);
    listaDeCompras.adicionaItemAoCarrinho();
    

    
  });
});
