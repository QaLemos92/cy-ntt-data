Cypress.Commands.add("cadastroValido", (nome, email, senha) => {
  cy.get('[data-testid="cadastrar"]').click();
  cy.get('[data-testid="nome"]').type(nome);
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(senha);
  cy.get('[data-testid="cadastrar"]').click();
});

Cypress.Commands.add("login", (email, senha) => {
  cy.intercept("POST", "/login").as("requestLogin");
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="senha"]').type(senha);
  cy.get('[data-testid="entrar"]').click();
  cy.wait("@requestLogin").then((res) => {
    const body = res.response.body;

    if (body.authorization) {
      window.localStorage.setItem("token", body.authorization);
      return "sucesso";
    }

    if (body.message && body.message.includes("Email e/ou senha inválidos")) {
      return "inválido";
    }
  });
});

Cypress.Commands.add("loginOuCadastra", (email, senha) => {
  cy.login(email, senha).then((response) => {
    if (response === "sucesso") {
      return;
    }

    if (response === "inválido") {
      cy.cadastroValido();
      cy.login(email, senha);
    }
  });
});

Cypress.Commands.add("loginAdmin", (email, senha) => {
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="senha"]').type(senha);
  cy.get('[data-testid="entrar"]').click();
});

Cypress.Commands.add("loginApi", (email, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("baseApiUrl")}/login`,
    body: {
      email: email,
      password: password,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("cadastroApiAdmin", (nome, email, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("baseApiUrl")}/usuarios`,
    body: {
      nome: nome,
      email: email,
      password: password,
      administrador: "true",
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});
