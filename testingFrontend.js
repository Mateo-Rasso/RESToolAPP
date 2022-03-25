describe('RestoolAPP', () => {

    before('Visit the restoolAPP website', () => {
       cy.visit('https://dsternlicht.github.io/RESTool/#/characters?search='); 
    });

    it('Verify that the user was redirected to the "Cast & Characters" section of the RESToolAPP website', () => {
        cy.get('title').contains('RESTool App');
        cy.get('#root > div > div.app-page > header > hgroup > h2').contains('Cast & Characters');
    });

    // ------------------------- Agregar un item nuevo a la lista de personajes -----------------------------------------

    it('Verify that the "+ADD item" button of the "Cast and Characters" section can be clicked', () => {
        cy.get('#root > div > div.app-page > header > button').click();
    });

    it('Verify that the "+ADD item" pop up can be completed with valid inputs', () => {
        cy.get('div.popup-content section > form > div:nth-child(1) > input[type=text]').type('https://www.latercera.com/resizer/8NS6Qdg6MUSEf3Z8C5MWQuB_l1Q=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/POAG7M24CFGYZLNBKEVHKTJMVU.jpg');
        cy.get('#popup-portal  div:nth-child(2) > input[type=text]').type('Dragon');
        cy.get('#popup-portal div:nth-child(3) > input[type=text]').type('Juan');
        cy.get('#popup-portal div:nth-child(4) > select').select('Beyond the Wall');
        cy.get('#popup-portal div:nth-child(5) input[type=checkbox]').check();
        cy.get(' div.buttons-wrapper.center > button').click();
    });

    // ---------------------- Eliminar un item de la lista de personajes ------------------------------------------------

    it('Verify that the item added to the characters list can be eliminated', () => {

        cy.wait(10000);

        cy.get('div:nth-child(10) button:nth-child(4)').click();
    });

});