class RestoolApp {
    visitCharacters() {
        cy.visit('https://dsternlicht.github.io/RESTool/#/characters?search='); // Se visita la pagina antes de cada test para que un test no dependa de otro 
    }

    visitEmployees() {
        cy.visit('https://dsternlicht.github.io/RESTool/#/employees?search=&page=1&limit=50')
    }

    /*createId() {
        return Date.Now().toString();
    }*/

    verifyNumberOfCharacters(number) {
        cy.get('#root div.app-page > main > div > div > div > div:nth-child(2) > span').should('have.length', number);
    }

    scrollAndWait(time, where, iterations) {
        for(let i = 0; i < iterations; i++){
            cy.scrollTo(where);
            cy.wait(time);
        }
    }

    verifyIdOfLastCharacter(id, truthValue) { //truthValue = 'have.text'/ 'not.have.text'
        cy.get('div:last-child > div:nth-child(2) > span').should(truthValue, id);
    }

    verifyLocationOfLastCharacter(location) {
        cy.get('#root div:last-child > div:nth-child(5) > span').should('have.text', location);
    }

    getAllCharacters() {
        return cy.get('#root div.app-page > main > div > div > div > div:nth-child(2) > span')
    }
}

export default RestoolApp; 