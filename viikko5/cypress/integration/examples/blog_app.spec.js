describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testuser',
      username: 'tester',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('testuser logged in')
    })

    it('login fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
      .should('contain', 'invalid username or password')
      //.and('have.css', 'color', 'rgb(255, 0, 0)')
      //.and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'testuser logged in')
  
    })
  })
})
