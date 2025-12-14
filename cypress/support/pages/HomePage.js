class HomePage {
  elementos = {
    titulo: () => cy.get("h1"),
    campo_pesquisa: () => cy.get('[data-testid="pesquisar"]'),
    botao_pesquisar: () => cy.get('[data-testid="botaoPesquisar"]'),
    lista_produtos: () => cy.get("#root > div > div > div.container-fluid > div > section .card"),
    botao_adicionarLista: () => cy.get('[data-testid="adicionarNaLista"]'),
    link_detalhesProduto: () => cy.get('[data-testid="product-detail-link"]'),
  };

  validarPaginaProdutos() {
    cy.url().should("include", "/home");
    this.elementos.titulo().should("contain", "Serverest Store");
  }

  validarPaginaAdmin(nome) {
    this.elementos.titulo().should("contain", `Bem Vindo ${nome}`);
  }

  pesquisarProduto(produto) {
    this.elementos.campo_pesquisa().type(produto);
  }

  submeterPesquisa() {
    this.elementos.botao_pesquisar().click();
  }

  verDetalhesDoProduto() {
    this.elementos.link_detalhesProduto().first().click();
  }

  adicionarItemSelecionadoNaLista() {
    this.elementos.botao_adicionarLista().first().click();
  }

  adicionarItemAleatorioNaLista() {
    cy.get(
      "#root > div > div > div.container-fluid > div > section .card"
    ).then(($cards) => {
      const total = $cards.length;
      const indexRandom = Math.floor(Math.random() * total);

      cy.wrap($cards[indexRandom]).as("produtoSelecionado");
      cy.get("@produtoSelecionado")
        .find('[data-testid="adicionarNaLista"]')
        .click();
    });
  }

  deslogarUsuario() {
    this.elementos.botao_deslogar().click();
  }
}

export default HomePage;
