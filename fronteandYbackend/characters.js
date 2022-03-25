/* Ejercicio en el que se realiza un GET, POST, PUT y DELETE de un personaje en la seccion "Cast & Characters" de la aplicacion web RESTool App

Los cambios efectuados por cada request se verifican a traves del frontend 

-------------------------------------------------------------------------------------------------------------------------------------------------- 

<reference types="cypress" /> - No funciona

import { RestoolApp } from "C:\Users\mrasso\OneDrive - ENDAVA\Desktop\Cypress\cypress\pageObjects"; - No funciona */

describe("RESTool APP Cast & Characters", () => {

   // const restoolObject = new RestoolApp() 

    let uniqueSeed = Date.now().toString()
    
    beforeEach(() => {
        //restoolObject.visit()
        cy.visit('https://dsternlicht.github.io/RESTool/#/characters?search=')
    });

    it("Test GET de un personaje", () => { 
        cy.wait(5000)
        cy.scrollTo('bottom')
        cy.wait(2000)
        cy.scrollTo('bottom')
        let numberOfCharacters
        let respuesta = 
                cy.request({
                    method: 'GET',
                    url: 'https://restool-sample-app.herokuapp.com/api/character',
                    form:true           
                }).then((response) => { 
                    expect(response.status).to.eq(200)
                    expect(response.body).to.not.be.null
                    return response.body.items.id        // La request devuelve un array de id de los personajes 
                })

        //cy.get('#root div.app-page > main > div > div > div > div:nth-child(2) > span').should('have.length',3)

        numberOfCharacters = respuesta.length // asignamos la longitud del array de ids (cantidad de personajes) a una variable - No funciona
        
        cy.scrollTo('bottom')
        cy.wait(2000)
        cy.scrollTo('bottom')
        cy.wait(2000)
        cy.scrollTo('bottom')
        cy.wait(2000)

        //cy.get('#root div.app-page > main > div > div > div > div:nth-child(2) > span').should('have.length', numberOfCharacters) - No funciona

        cy.get('#root div.app-page > main > div > div > div > div:nth-child(2) > span').each(($el, index,  $list)=> {
            expect(respuesta).to.include($el.text) // Verifica que cada id ($el.text) se encuentre en el array respuesta = response.body.items.id
            cy.log(index)
            //expect(respuesta[index]).to.equal($el.text)  No funciona ya que "respuesta" es un identificador de una variable y no de un array
        })
    });

    
    it('Test POST de un personaje', () => {
        
        cy.request({
                method: 'POST',
                url: 'https://restool-sample-app.herokuapp.com/api/character',
                form: true,
            body:{
                id: uniqueSeed,
                thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT083A3OT8c7vXWhNFcDOM6wyHo7hXer6aIqw&usqp=CAU",
                name: "Juan",
                realName: "Martin",
                location: "Winterfell",
                isAlive: true
                }
            }).then(async(response) => {
                await expect(response.status).to.eq(200)
                expect(response.body).to.not.be.null
            })

            cy.reload()
            cy.wait(2000)
            cy.scrollTo('bottom')
            cy.wait(2000)
            cy.scrollTo('bottom')
            cy.wait(2000)
            cy.scrollTo('bottom')
            cy.wait(2000)
            cy.get('div:last-child > div:nth-child(2) > span').should('have.text', uniqueSeed) // Verificamos que el POST se refleje en el frontend comparando el id del 
                                                                                            //ultimo personaje en la pagina, con el id del Body del POST.
        });

    it('Test PUT del personaje creado', () => {       
        
        cy.request({
            method: 'PUT',
            url: 'https://restool-sample-app.herokuapp.com/api/character/' + uniqueSeed,
            body:{
                id: uniqueSeed,
                thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT083A3OT8c7vXWhNFcDOM6wyHo7hXer6aIqw&usqp=CAU',
                name: 'Juan',
                realName: 'Martin',
                location: 'Beyond the wall',
                isAlive: true
                }
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body).to.not.be.null
                expect(response.body).to.be.eq('ok')
        })

    // -------------------------- Comprobamos que el personaje haya sido editado comparando el backend con el frontend para verificar la request de tipo PUT ---------------------------------------

        cy.reload() // Refrescamos la pagina para verificar que los cambios realizados con el PUT se reflejen en el frontend 
        cy.wait(2000)
        cy.scrollTo('bottom')
        cy.wait(2000)
        cy.scrollTo('bottom')
        cy.wait(2000)
        
        cy.get('#root div:last-child > div:nth-child(5) > span').should('have.text', 'Beyond the wall')
    });

    // ------------------------- Enviamos una request de tipo DELETE para eliminar el personaje creado ---------------------------------------------------------------

    it('Test DELETE del personaje creado', () => {  // Mismo delete que el anterior pero en otro test. 
        
        cy.wait(2000)

        cy.request({
            method: 'DELETE',
            url: 'https://restool-sample-app.herokuapp.com/api/character/' + uniqueSeed
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body).to.eq('ok')
        })

        cy.reload() // Refrescamos la pagina para verificar que los cambios realizados con el DELETE se reflejen en el frontend

        cy.wait(1000)
        cy.scrollTo('bottom')
        cy.wait(2000)
        cy.scrollTo('bottom')
        cy.wait(2000)

        cy.get('#root div:last-child > div:nth-child(2) > span').should('not.have.text',uniqueSeed) // Verificamos que el ultimo personaje en la pagina no sea el que creamos, ya que deberia haber sido eliminado con la request DELETE enviada
    });
});