describe("User Login",() => {
    it('Should login',()=>{
        cy.visit('/')
        cy.get('#username').type('Allie2');
        cy.get('#password').type('s3cret');
        cy.get('button[type="submit"]').click()
        cy.get('[data-test="main"]').should('be.visible')
        cy.pause()
        // cy.intercept("GET", "/notifications*"); //?
    })
    it('User creates request transaction',()=>{
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.url().should('include','/transaction/new')
        cy.get('#user-list-search-input').type('Ibrahim Dickens');
        cy.get('[data-test="users-list"]').find('li').should('have.length',1).click();
        cy.get('#amount').type(10);

        /**
         * ernst:set up the interception
         */
        cy.intercept("POST","/transactions").as("transaction");

        cy.get('#transaction-create-description-input').type('Say Hello to my little friend');
        // cy.get('button').contains('request').click();
        cy.get('button > span').contains('Request').click();

        /**
         * ernst: backbone for network assertion
         */
        cy.wait("@transaction").should(({ request, response }) => {
            /**
             * code some assertion for StatusCode
             * and memorize `transactionId` (create alias with `as` command for this value)
             */
        });
        
    })
    it('Another user have notification',()=>{ 
        /**
         * set up the interception
         */
        cy.intercept("GET",`/notifications`).as("notifications");

        /**
         * ernst: you better explicitly logout user by ui 
         * since you keep local storage across test cases
         */
        cy.visit('/');
        cy.get('#username').type('Giovanna74');
        cy.get('#password').type('s3cret');
        cy.get('button[type="submit"]').click();
        cy.get('[data-test="main"]').should('be.visible');
        
        /**
         * ernst: backbone for network assertion.
         * But remember - this call should happen in the app.
         */
        cy.wait("@notifications").should(({ request, response }) => {
            /**
             * ernst: make some network assertions
             * get transaction id from body of intercepted `/notifications`
             * and get the transactionId you memorized a while ago.
             * Then compare these two value (use `expect` method and the rest of the matchers)
             */
        });
    })
})