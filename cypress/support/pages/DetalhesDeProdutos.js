class DetalhesDeProdutos {
  elementos = {
    titulo: () => cy.get("h1"),
    botao_adicionarCarrinho: () => cy.get('[data-testid="product-detail-link"]'),
    link_voltarProdutos: () => cy.get('[data-testid="voltarHome"]'),
    texto_detalhes: () => cy.get(".especificacoes"),
  };

  validarPaginaDetalhesDoProduto() {
    cy.url().should("include", "/detalhesProduto");
    this.elementos.titulo().should("have.text", "Detalhes do produto");
  }

  adicionarItemNaLista() {
    this.elementos.botao_adicionarCarrinho().click();
  }

  voltarParaPaginaDeProdutos() {
    this.elementos.link_voltarProdutos().click();
  }

  validarDetalhesDoProduto() {
    this.elementos
      .texto_detalhes()
      .should("exist")
      .should("contain.text", "Detalhes");
  }
}

export default DetalhesDeProdutos;
