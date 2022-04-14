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
            url: 'https://restool-sample-app.herokuapp.com/api/character/du7WaAUDF88G',
            form: true 
        }).then( async (response) => {
            expect(response.status).to.be.eq(200)
            expect(response.body).to.not.be.null
            returnObject = new Character(response.body.name, response.body.id, response.body.realName);
            return JSON.stringify(returnObject);
        })
        cy.log(characterObject.name)
    });

    it.skip('TEST - GET de todos los personajes y los meto en un array', () => { // crear una instancia de la clase Character en este ejercicio pero adentro del "for"
        let character, resp, characterId = 'du7WaAUDF88G';
        resp = cy.request({
            method: 'GET',
            url: 'https://restool-sample-app.herokuapp.com/api/character',
            form: true
        }).then( async (response) => {
            expect(response.status).to.be.eq(200)
            expect(response.body).to.not.be.null
            for(let i = 0; i < response.body.items; i++){
                if(response.body.items[i].id == characterId){
                    character = response.body.items[i];
                }
            }
            return JSON.stringify(character);
        })

        //cy.log(resp)
    });
});

