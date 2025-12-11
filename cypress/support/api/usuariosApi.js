class UsuariosApi {

    criarUsuario(dadosUsuario) {
        return cy.request({
            method: 'POST',
            url: '/usuarios',
            body: dadosUsuario,
            failOnStatusCode: false
        });
    }

    deletarUsuario(usuarioId) {
        return cy.request('DELETE', `/usuarios/${usuarioId}`);
    }
}

export default new UsuariosApi();