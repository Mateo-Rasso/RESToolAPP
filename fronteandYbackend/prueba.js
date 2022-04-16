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
            url: 'https://restool-sample-app.herokuapp.com/api/character/BwDkxNbYaPox',
            form: true 
        }).then( async (response) => {
            expect(response.status).to.be.eq(200)
            expect(response.body).to.not.be.null
            returnObject = new Character(response.body.name, response.body.id, response.body.realName);
            cy.log('hola ' + returnObject.characterName) // Muestra "hola undefined" 
            cy.log('hola ' + response.body.name) // Muestra "hola undefined"
            return returnObject;
        })

        cy.log(characterObject)

        cy.log(characterObject.characterName)
        
    });
});

