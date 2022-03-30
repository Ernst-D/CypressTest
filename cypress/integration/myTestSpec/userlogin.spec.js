describe("User Login",() => {
    
    it('Should login',()=>{
        cy.visit('/')
        cy.get('#username').type('Allie2');
        cy.get('#password').type('s3cret');
        cy.get('button[type="submit"]').click()
        cy.get('[data-test="main"]').should('be.visible')
        // cy.intercept("GET", "/notifications*"); //?
    })
    it('User creates request transaction',()=>{
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.url().should('include','/transaction/new')
        cy.get('#user-list-search-input').type('Ibrahim Dickens');
        cy.get('[data-test="users-list"]').find('li').should('have.length',1).click();
        cy.get('#amount').type(10);
        cy.get('#transaction-create-description-input').type('Say Hello to my little friend');
        // cy.get('button').contains('request').click();
        cy.get('button > span').contains('Request').click();
        
    })
    it('Another user have notification',()=>{ 
        cy.visit('/');
        cy.get('#username').type('Giovanna74');
        cy.get('#password').type('s3cret');
        cy.get('button[type="submit"]').click();
        cy.get('[data-test="main"]').should('be.visible');
        
    })


})