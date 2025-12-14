import LoginPage from "../../support/pages/LoginPage";
import HomePage from "../../support/pages/HomePage";
import DetalhesDeProdutos from "../../support/pages/DetalhesDeProdutos";
import { criarUsuarioNormal } from "../../support/utils/geradorUsuario";
import ListaDeCompras from "../../support/pages/ListaDeCompras";
import HeaderPage from "../../support/pages/HeaderPage"

const detalhesDeProdutos = new DetalhesDeProdutos();
const loginPage = new LoginPage();
const homePage = new HomePage();
const listaDeCompras = new ListaDeCompras();
const header = new HeaderPage();

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
    homePage.pesquisarProduto("Samsung");
    homePage.submeterPesquisa();
    homePage.verDetalhesDoProduto();

  });

  it("Deve adicionar um item aleatório na lista - validar os detalhes - deslogar", () => {
    homePage.adicionarItemAleatorioNaLista();
    header.acessaListaDeCompras();
    listaDeCompras.validarPaginaListaDeCompras();
    listaDeCompras.ajustarQuantidade(5);
    header.realizaLogout();
  });

  it('deve cadastrar - logar - ver detalhes - adicionar na lista - aumentar quantidade - adicionar ao carrinho - deslogar', () => {
    homePage.verDetalhesDoProduto();
    detalhesDeProdutos.adicionarItemNaLista();
    listaDeCompras.ajustarQuantidade(8);
    listaDeCompras.adicionaItemAoCarrinho();
    header.acessaCarrinho();
    header.realizaLogout();
        
  });
});
