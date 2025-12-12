class UsuariosApi {

    criarUsuario(dadosUsuario) {
        return cy.request('POST',`${Cypress.env('baseApiUrl')}/usuarios`, dadosUsuario);
    }

    listaUsuarios() {
        return cy.request('GET',`${Cypress.env('baseApiUrl')}/usuarios`);
    }

    deletarUsuario(usuarioId) {
        return cy.request('DELETE', `${Cypress.env('baseApiUrl')}/usuarios/${usuarioId}`);
    }
}

export default new UsuariosApi();