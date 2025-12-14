# Testes Automatizados — Avaliação Técnica NTT Data

Este repositório contém testes automatizados de **API** e **UI** desenvolvidos com **Cypress**, utilizando arquitetura **Page Object Model (POM)**.  
Os testes foram criados para validar funcionalidades do ambiente público **Serverest.dev**.

---

## O que foi implementado

### UI (E2E)

- Teste de login.  
- Teste de busca de produtos.  
- Teste de adição de um produto aleatório ao carrinho.  

### API

- Testes de criação e exclusão de usuários.
- Testes de criação e exclusão de produtos.
- Testes de criação e exclusão de carrinho.   

---

## Arquitetura

- Page Object Model aplicado em UI e API.  
- Organização modular para endpoints em `/support/api`.    
- Configurações separadas:
  - `baseUrl` para testes UI  
  - `baseApiUrl` para testes de API  

---

## Como executar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Abrir a interface do Cypress

```bash
npm run test
```

### 3. Executar em modo headless


```bash
npm run test:api
```
```bash
npm run test:ui
```