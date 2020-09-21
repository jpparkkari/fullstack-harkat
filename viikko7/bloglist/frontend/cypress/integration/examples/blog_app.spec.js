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

  it('Login form is shown', function() {
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
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'sekret' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('tester')
      cy.get('#url').type('www')
      cy.contains('create').click()
      cy.contains('a blog created by cypress')
    })
    describe('a blog', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'tester',
          url: 'www',
        })
      })
      it('can be liked', function() {
        cy.contains('view').click()
        cy.get('#likeButton').click()
        cy.contains('likes 1')

      })
      it('can be removed', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'a blog created by cypress')
      })

    })

    describe('blogs', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first blog', author: 'tester', url: 'www', likes: 1 })
        cy.createBlog({ title: 'second blog', author: 'tester', url: 'www', likes: 3 })
        cy.createBlog({ title: 'third blog', author: 'tester', url: 'www', likes: 2 })
      })
      it('are ordered by likes descending', function() {

        cy.get('.viewButton').then( viewButtons => {
          cy.wrap(viewButtons[0]).click()
          cy.contains('likes 3')
          cy.contains('hide').click()
          cy.wrap(viewButtons[1]).click()
          cy.contains('likes 2')
          cy.contains('hide').click()
          cy.wrap(viewButtons[2]).click()
          cy.contains('likes 1')
        })
      })
    })
  })

})
