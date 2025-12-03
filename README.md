# Testes End-to-End com Cypress — RACK+

## Visão Geral
Este repositório contém testes end-to-end automatizados para a aplicação **RACK+**, desenvolvidos com **Cypress**.  
Os testes cobrem duas páginas principais: **Login** e **Homepage**, garantindo a qualidade e funcionalidade do sistema.

---

## Estrutura dos Testes

---

## 1. Testes da Página de Login  
**Arquivo:** `login/loginhtml.html`  
**URL Base:** `http://127.0.0.1:3000/login/loginhtml.html`

### Elementos da Página
- Verificação do título da página  
- Validação de todos os elementos do formulário (campos, labels, links, logo)

### Validações de Login
- Campos obrigatórios  
- Credenciais incorretas  
- Login bem-sucedido  
- Tratamento de espaços em branco  
- Case-sensitivity do email

### Funcionalidade do Botão "Mostrar Senha"
- Alternância de visibilidade da senha  
- Verificação dos ícones correspondentes

### Links e Navegação
- Redirecionamento para página de cadastro  
- Links do YouTube (recuperação de senha e logo)

---

## 2. Testes da Homepage RACK+  
**Arquivo:** `homepage/homepagehtml.html`  
**URL Base:** `http://127.0.0.1:3000/homepage/homepagehtml.html`

### Elementos da Página
- Verificação dos elementos principais  
- Layout responsivo (desktop e mobile)  
- Links do YouTube nos cards de sala

### Barra Lateral (Desktop)
- Verificação dos ícones e seus links  
- Navegação para API Pokémon  
- Links do YouTube

### Menu Mobile
- Abertura e fechamento do menu  
- Ícones e funcionalidades

### Ícone de Usuário
- Presença em desktop e mobile  
- Redirecionamento para YouTube

### Testes Responsivos
- Adaptação entre diferentes tamanhos de tela  
- Verificação do layout do conteúdo principal

### Testes de Funcionalidade
- Campo de pesquisa (apenas no mobile)  
- Título **"Salas"** (apenas no desktop)

---
