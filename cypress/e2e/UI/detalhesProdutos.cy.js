import DetalhesDeProdutos from "../../pages/DetalhesDeProdutos";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";

const detalhesDeProdutos = new DetalhesDeProdutos();
const loginPage = new LoginPage();
const homePage = new HomePage();

describe('Página de Detalhes dos Produtos', () => {

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

    it('Deve visualizar os detalhes de um produto', () => {
        homePage.verDetalhesDoProduto();
        detalhesDeProdutos.validarPaginaDetalhesDoProduto();
        detalhesDeProdutos.validarDetalhesDoProduto();
    });

    it('Deve voltar para a página de produtos a partir dos detalhes do produto', () => {
        homePage.verDetalhesDoProduto();
        detalhesDeProdutos.voltarParaPaginaDeProdutos();
        homePage.validarPaginaProdutos();
    });
});