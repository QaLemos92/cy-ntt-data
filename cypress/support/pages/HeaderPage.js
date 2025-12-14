class HeaderPage  {
    elementos = {
        logout: () => cy.get('[data-testid="logout"]'),
        carrinho: () => cy.get('[data-testid="carrinho"]'),
        listaDeCompras: () => cy.get('[data-testid="lista-de-compras"]'),
        home: () => cy.get('[data-testid="home"]')
    }

    realizaLogout(){
        this.elementos.logout().click()
    }

    acessaCarrinho(){
        this.elementos.logout().click()
    }

    acessaListaDeCompras() {
        this.elementos.listaDeCompras().click()
    }

    acessaHome(){
        this.elementos.home().click()
    }
}

export default HeaderPage;