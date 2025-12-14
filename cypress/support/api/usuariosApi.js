class UsuariosApi {

    criarUsuario(dadosUsuario) {
        return cy.request({
            method:'POST',
            url:`${Cypress.env('baseApiUrl')}/usuarios`,
            body: dadosUsuario,
            failOnStatusCode: false
        });
    }

    listaUsuarios() {
        return cy.request('GET',`${Cypress.env('baseApiUrl')}/usuarios`);
    }

    deletarUsuario(usuarioId) {
        return cy.request('DELETE', `${Cypress.env('baseApiUrl')}/usuarios/${usuarioId}`);
    }
}

export default new UsuariosApi();