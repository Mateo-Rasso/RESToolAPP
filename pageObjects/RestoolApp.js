class RestoolApp {
    visit() {
        cy.visit('https://dsternlicht.github.io/RESTool/#/characters?search='); // Se visita la pagina antes de cada test para que un test no dependa de otro 
    }
}

export default RestoolApp; 