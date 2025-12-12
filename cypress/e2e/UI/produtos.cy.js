import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import DetalhesDeProdutos from "../../pages/DetalhesDeProdutos";

const detalhesDeProdutos = new DetalhesDeProdutos();
const loginPage = new LoginPage();
const homePage = new HomePage();

describe('Página de Produtos', () => {

    const email = 'eduardo.anemolos@outlook.com';
    const senha = '123456';

    beforeEach(() => {
        cy.session('usuarioLogado', () => {
            cy.visit('/login');
            cy.loginOuCadastra('Eduardo Lemos', email, senha);
        });
        cy.visit('/home');
        homePage.validarPaginaProdutos();
    });

    it('Pesquisa por um produto específico', () => {
        homePage.pesquisarProduto('Electronic Wooden Car');
        // É esperado que não funcione como esperado
    });

    it('Deve adicionar um item aleatório no carrinho', () => {
        homePage.adicionarItemAleatorioAoCarrinho();
        
    })
});