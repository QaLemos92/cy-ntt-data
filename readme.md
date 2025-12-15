# Testes Automatizados — Avaliação Técnica NTT Data

Este repositório contém testes automatizados de **API** e **UI** desenvolvidos com **Cypress**, utilizando arquitetura **Page Object Model (POM)**.  
Os testes foram criados para validar funcionalidades do ambiente público **Serverest.dev**.

---

## O que foi implementado

### UI (E2E)

- Fluxo de cadastro e login de usuário.
- Validação da página de listagem de produtos.
- Pesquisa de produtos por termo.
- Visualização de detalhes do produto.
- Adição de produto aleatório à lista de compras.
- Ajuste de quantidade de itens.
- Adição de itens ao carrinho.
- Logout do usuário.  

### API

#### Usuários
- Criação de usuário com sucesso.
- Validação de erro ao tentar cadastrar usuário com e-mail já existente.
- Validação de regras de autenticação.

#### Produtos
- Criação e exclusão de produtos (usuário administrador).
- Validação de erro ao criar produto sem autenticação.
- Validação de erro ao criar produto com token inválido.
- Validação de restrição de criação por usuário não administrador.

#### Carrinho
- Criação de carrinho vinculada ao usuário autenticado.
- Validação da redução de estoque ao adicionar produtos ao carrinho.
- Cancelamento de compra com reabastecimento do estoque.
- Validação de acesso negado sem autenticação.
- Validação de isolamento de carrinho entre usuários. (Este falha na segurança)
---

## Arquitetura e Boas Práticas

- Arquitetura **Page Object Model (POM)** aplicada para:
  - UI (`/support/pages`)
  - API (`/support/api`)
- Separação clara de responsabilidades por domínio (usuário, produto, carrinho).
- Uso de **commands customizados** para autenticação e setup de dados.
- Geradores de dados dinâmicos para evitar conflitos entre execuções.
- Testes independentes e estáveis, sem dependência entre cenários.  

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
