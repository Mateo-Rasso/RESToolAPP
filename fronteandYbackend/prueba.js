// Intente de realizar una request GET que devuelva un personaje especifico, pero por alguna razon el body de la response esta vacio 

describe('', () => {

    class Character {
        constructor(characterName, characterId, characterRealName){
            this.characterName = characterName;
            this.characterId = characterId;
            this.characterRealName = characterRealName;
        }
    }

    it('TEST - GET de un personaje especifico ', () => {

        let characterObject, returnObject;

        cy.visit('https://dsternlicht.github.io/RESTool/#/characters')
    
        characterObject = cy.request({
            method: 'GET',
            url: 'https://restool-sample-app.herokuapp.com/api/character/BFwpCFxY6y8P',
            form: true 
        }).then( async (response) => {
            expect(response.status).to.be.eq(200)
            expect(response.body).to.not.be.null
            returnObject = new Character(response.body.name, response.body.id, response.body.realName);
            cy.log(returnObject.characterName) // Esto funiona. Imprime el nombre del personaje.
            cy.log(response.body.name) // Esto funciona. Imprime el nombre del personaje.
            return JSON.stringify(returnObject);
        })

        cy.log(characterObject.characterName) // Esto NO funciona. No imprime el nombre
        
    });
});

