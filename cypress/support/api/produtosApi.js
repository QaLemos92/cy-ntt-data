class ProdutosApi{

    criarProduto(dados){
        return cy.request('POST', `${Cypress.env('baseApiUrl')}/produtos`, dados);
    }

    listarProdutos(){
        return cy.request('GET', `${Cypress.env('baseApiUrl')}/produtos`);
    }

    deletarProduto(produtoId){
        return cy.request('DELETE', `${Cypress.env('baseApiUrl')}/produtos/${produtoId}`);
    }
}

export default new ProdutosApi();