// cypress/e2e/login.cy.js

describe('Testes da Página de Login', () => {
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('http://127.0.0.1:3000/login/loginhtml.html'); // Altere para o caminho correto
  });

  describe('Layout e Elementos da Página', () => {
    it('deve carregar a página corretamente', () => {
      cy.title().should('eq', 'RACK+ Login');
      cy.get('h1').should('contain', 'Entrar');
    });

    it('deve exibir todos os elementos do formulário', () => {
      // Verifica campos do formulário
      cy.get('#email').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#togglePassword').should('be.visible');
      cy.get('button[onclick="fazer_login()"]').should('be.visible');
      
      // Verifica labels
      cy.contains('label', 'E-mail').should('be.visible');
      cy.contains('label', 'Senha').should('be.visible');
      
      // Verifica links
      cy.contains('a', 'Não possui uma conta? Cadastre-se!').should('be.visible');
      cy.contains('a', 'Esqueceu sua senha?').should('be.visible');
      
      // Verifica logo
      cy.get('.logo-img').should('be.visible');
    });
  });

  describe('Validações de Formulário', () => {
    it('deve exibir mensagem de erro quando campos estão vazios', () => {
      cy.get('button[onclick="fazer_login()"]').click();
      cy.get('#mensagem')
        .should('be.visible')
        .and('have.text', 'Por favor, preencha todos os campos.')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });

    it('deve exibir mensagem de erro quando email está vazio', () => {
      cy.get('#password').type('algumasenha');
      cy.get('button[onclick="fazer_login()"]').click();
      cy.get('#mensagem')
        .should('be.visible')
        .and('have.text', 'Por favor, preencha todos os campos.');
    });

    it('deve exibir mensagem de erro quando senha está vazia', () => {
      cy.get('#email').type('teste@email.com');
      cy.get('button[onclick="fazer_login()"]').click();
      cy.get('#mensagem')
        .should('be.visible')
        .and('have.text', 'Por favor, preencha todos os campos.');
    });

    it('deve exibir mensagem de erro para credenciais incorretas', () => {
      cy.get('#email').type('email_incorreto@teste.com');
      cy.get('#password').type('senha_incorreta');
      cy.get('button[onclick="fazer_login()"]').click();
      
      cy.get('#mensagem')
        .should('be.visible')
        .and('have.text', 'E-mail ou senha incorretos.')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('Funcionalidade de Login', () => {
    it('deve fazer login com credenciais corretas', () => {
      cy.get('#email').type('indiano@gmail.com');
      cy.get('#password').type('Indiano*123');
      cy.get('button[onclick="fazer_login()"]').click();
      
      // Verifica se redirecionou para a homepage
      cy.url().should('include', '/homepagehtml.html');
    });

    it('não deve fazer login com email incorreto', () => {
      cy.get('#email').type('email_incorreto@gmail.com');
      cy.get('#password').type('Indiano*123');
      cy.get('button[onclick="fazer_login()"]').click();
      
      cy.get('#mensagem')
        .should('be.visible')
        .and('have.text', 'E-mail ou senha incorretos.');
    });

    it('não deve fazer login com senha incorreta', () => {
      cy.get('#email').type('indiano@gmail.com');
      cy.get('#password').type('senha_incorreta');
      cy.get('button[onclick="fazer_login()"]').click();
      
      cy.get('#mensagem')
        .should('be.visible')
        .and('have.text', 'E-mail ou senha incorretos.');
    });

    it('deve fazer login com espaços em branco nas extremidades', () => {
      cy.get('#email').type('  indiano@gmail.com  ');
      cy.get('#password').type('  Indiano*123  ');
      cy.get('button[onclick="fazer_login()"]').click();
      
      cy.url().should('include', '/homepagehtml.html');
    });

    it('deve ser case-sensitive para o email', () => {
      cy.get('#email').type('INDIANO@gmail.com');
      cy.get('#password').type('Indiano*123');
      cy.get('button[onclick="fazer_login()"]').click();
      
      cy.get('#mensagem')
        .should('be.visible')
        .and('have.text', 'E-mail ou senha incorretos.');
    });

    it('deve ser case-sensitive para a senha', () => {
      cy.get('#email').type('indiano@gmail.com');
      cy.get('#password').type('indiano*123'); // minúsculo
      cy.get('button[onclick="fazer_login()"]').click();
      
      cy.get('#mensagem')
        .should('be.visible')
        .and('have.text', 'E-mail ou senha incorretos.');
    });
  });

  describe('Funcionalidade do Botão "Mostrar Senha"', () => {
    it('deve alternar a visibilidade da senha', () => {
      const senha = 'Indiano*123';
      cy.get('#password').type(senha);
      
      // Verifica que inicialmente a senha está oculta
      cy.get('#password').should('have.attr', 'type', 'password');
      cy.get('#eyeIcon').should('have.class', 'bi-eye-slash');
      
      // Clica para mostrar a senha
      cy.get('#togglePassword').click();
      cy.get('#password')
        .should('have.attr', 'type', 'text')
        .and('have.value', senha);
      cy.get('#eyeIcon').should('have.class', 'bi-eye');
      
      // Clica novamente para ocultar
      cy.get('#togglePassword').click();
      cy.get('#password')
        .should('have.attr', 'type', 'password')
        .and('have.value', senha);
      cy.get('#eyeIcon').should('have.class', 'bi-eye-slash');
    });
  });

  describe('Links e Navegação', () => {
    it('deve redirecionar para página de cadastro', () => {
      cy.contains('a', 'Não possui uma conta? Cadastre-se!')
        .should('have.attr', 'href', '../cadastro/cadastrohtml.html')
        .click();
      cy.url().should('include', 'cadastrohtml.html');
    });

    it('deve redirecionar para o link de "esqueci senha"', () => {
      cy.contains('a', 'Esqueceu sua senha?')
        .should('have.attr', 'href', 'https://www.youtube.com/watch?v=La44ebRSy-Y');
    });

    it('deve redirecionar para o link da logo', () => {
      cy.get('.logo-img')
        .parent()
        .should('have.attr', 'href', 'https://www.youtube.com/watch?v=La44ebRSy-Y');
    });
  });

  describe('Efeitos Visuais', () => {
    it('deve aplicar efeito shake na mensagem de erro', () => {
      cy.get('button[onclick="fazer_login()"]').click();
      
      // Verifica se a classe shake foi adicionada
      cy.get('#mensagem').should('have.class', 'shake');
      
      // Aguarda o tempo da animação e verifica se a classe foi removida
      cy.wait(500);
      cy.get('#mensagem').should('not.have.class', 'shake');
    });

    it('deve aplicar efeito shake múltiplas vezes', () => {
      // Primeira tentativa
      cy.get('button[onclick="fazer_login()"]').click();
      cy.get('#mensagem').should('have.class', 'shake');
      cy.wait(500);
      
      // Segunda tentativa
      cy.get('button[onclick="fazer_login()"]').click();
      cy.get('#mensagem').should('have.class', 'shake');
      cy.wait(500);
      cy.get('#mensagem').should('not.have.class', 'shake');
    });
  });
});