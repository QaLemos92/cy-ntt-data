class ListaDeCompras {
  elementos = {
    titulo: () => cy.get("h1"),
    voltar_paginaInicial: () => cy.get('[data-testid="paginaInicial"]'),
    adicionar_carrinho: () => cy.get('[data-testid="adicionar carrinho"]'),
    limpar_lista: () => cy.get('[data-testid="limparLista"]'),
    quantidade_atual: () => cy.get('[data-testid="shopping-cart-product-quantity"]'),
    diminuir_quantidade: () => cy.get('[data-testid="product-decrease-quantity"]'),
    aumentar_quantidade: () => cy.get('[data-testid="product-increase-quantity"]')
  };

  validarPaginaListaDeCompras(){
    cy.url().should("include", "/minhaListaDeProdutos");
    this.elementos.titulo().should('have.text', 'Lista de Compras')
  }

  voltarPaginaInicial(){
    this.elementos.voltar_paginaInicial().click()
  }

  adicionaItemAoCarrinho() {
    this.elementos.adicionar_carrinho().click()
  }

  limpaListaDeCompras() {
    this.elementos.limpar_lista().click()
  }

  ajustarQuantidade(quantidadeDesejada) {
    this.elementos.quantidade_atual().invoke('val').then((quantidadeAtual) => {
        const atual = Number(quantidadeAtual)
        const desejado = Number(quantidadeDesejada)

        if(atual < desejado) {
            const clicks = (desejado - 1) - atual
            Cypress._.times(clicks, () => {
                this.elementos.aumentar_quantidade().click()
            })
        }

        if (atual > desejado){
            const clicks = desejado - atual
            Cypress._.times(clicks, () => {
                this.elementos.diminuir_quantidade().click()
            })
        }
    })
  }
}

export default ListaDeCompras;