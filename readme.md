Testes Automatizados — Avaliação Técnica NTT Data

Este repositório contém testes automatizados de API e UI desenvolvidos com Cypress utilizando arquitetura Page Object Model (POM).
Os testes foram criados para validar funcionalidades do ambiente público Serverest.dev.

O que foi implementado
UI (E2E)

Teste de login utilizando cy.session para persistência entre cenários.

Teste de busca de produtos.

Teste de adição de um produto aleatório ao carrinho.

API

Testes de criação e exclusão de usuários.

Testes de criação e exclusão de produtos.

Fluxo completo de carrinho:

Login via API

Criação de produto

Verificação e remoção de carrinho existente

Criação de novo carrinho com o produto criado

Arquitetura

Page Object Model aplicado tanto para UI quanto para API.

Organização em módulos separados para endpoints (/support/api).

Uso de utilitário para dados dinâmicos (utils.js).

Configurações separadas para baseUrl (UI) e baseApiUrl (API).

Como executar o projeto
1. Instalar dependências
npm install

2. Abrir a interface do Cypress
npx cypress open

3. Executar em modo headless
npx cypress run

Estrutura básica do projeto
cypress/
 ├── e2e/
 │    ├── api/
 │    └── ui/
 ├── support/
 │    ├── api/
 │    ├── pages/
 │    ├── utils.js
 │    └── commands.js
 └── fixtures/