/* Ejercicio en el que se realiza un GET, POST, PUT y DELETE de un personaje en la seccion "Cast & Characters" de la aplicacion web RESTool App

Los cambios efectuados por cada request se verifican a traves del frontend 

-------------------------------------------------------------------------------------------------------------------------------------------------- 

*/ 

import RestoolApp from '../pageObjects/RestoolApp'; // Ruta desde este archivo hasta el archivo donde tengo mis clases (sin la extension .js)

describe("RESTool APP Cast & Characters", function() {

    let restoolObject = new RestoolApp(); 

    //let uniqueId = restoolObject.createId();

    let uniqueId = Date.now().toString();
    
    beforeEach(() => {
        restoolObject.visitCharacters();
    });

    it("Test GET de todos los personajes y verifico que los personajes se encuentren en el frontend", () => {

        cy.wait(5000)

        restoolObject.scrollAndWait(2000, 'bottom', 2)

        let arrayIds =
                cy.request({
                    method: 'GET',
                    url: 'https://restool-sample-app.herokuapp.com/api/character',
                    form:true           
                }).then((response) => { 
                    expect(response.status).to.eq(200)
                    expect(response.body).to.not.be.null
                    let characters = response.body.items // characters es un array de objetos (personajes)
                    let numberOfCharacters = characters.length // Obtengo el numero de personajes y lo guardo en una variable para luego verificarlo con lo que obtenga desde el frontend
                    restoolObject.verifyNumberOfCharacters(numberOfCharacters);
                    /*for(let i = 0; i < characters.length; i++){ Esto deberia funcionar supuestamente, imprime los ids de los personajes. 
                        cy.log(response.body.items[i].id)        // Probar de nuevo con 9 personajes. (No es prioritario).
                        cy.log(i)
                    } */ 
                    return response.body.items.id // La request devuelve un array de id de los personajes 
                })
        
        restoolObject.scrollAndWait(2000, 'bottom', 3);

        restoolObject.getAllCharacters().each(($el, index,  $list) => {
            expect(arrayIds).to.include($el.text) // Verifica que cada id ($el.text) se encuentre en el array respuesta = response.body.items.id
            //cy.log(index)
            //expect(arrayIds[index]).to.equal($el.text)  No funciona ya que "arrayIds" es un identificador de una variable y no de un array
        })
    });

    
    it('Test POST de un personaje y verifico que el personaje creado se muestre en el frontend', () => {
        
        cy.request({
                method: 'POST',
                url: 'https://restool-sample-app.herokuapp.com/api/character',
                form: true,
            body:{
                id: uniqueId,
                thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT083A3OT8c7vXWhNFcDOM6wyHo7hXer6aIqw&usqp=CAU",
                name: "Juan",
                realName: "Martin",
                location: "Winterfell",
                isAlive: true
                }
            }).then(async(response) => {
                await expect(response.status).to.eq(200)
                expect(response.body).to.not.be.null
                expect(response.body.id).to.be.eq(uniqueId)
            })

        cy.reload()

        cy.wait(2000)

        restoolObject.scrollAndWait(2000, 'bottom', 3);

        restoolObject.verifyIdOfLastCharacter(uniqueId, 'have.text'); // Verificamos que el POST se refleje en el frontend comparando el id del 
                                                                      //ultimo personaje en la pagina, con el id del Body del POST.
    });

    it('Test PUT del personaje creado y verifico que las modificaciones se muestren en el frontend', () => {       
        
        cy.request({
            method: 'PUT',
            url: 'https://restool-sample-app.herokuapp.com/api/character/' + uniqueId,
            body:{
                id: uniqueId,
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

        restoolObject.scrollAndWait(2000, 'bottom', 2);
        
        restoolObject.verifyLocationOfLastCharacter('Beyond the wall');
    });

    // ------------------------- Enviamos una request de tipo DELETE para eliminar el personaje creado ---------------------------------------------------------------

    it('Test DELETE del personaje creado', () => {  // Mismo delete que el anterior pero en otro test. 
        
        cy.wait(2000)

        cy.request({
            method: 'DELETE',
            url: 'https://restool-sample-app.herokuapp.com/api/character/' + uniqueId
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body).to.eq('ok')
        })

        cy.reload() // Refrescamos la pagina para verificar que los cambios realizados con el DELETE se reflejen en el frontend

        cy.wait(1000)
        
        restoolObject.scrollAndWait(2000, 'bottom', 2);

        restoolObject.verifyIdOfLastCharacter(uniqueId, 'not.have.text') // Verificamos que el ultimo personaje en la pagina no sea el que creamos, ya que deberia haber sido eliminado con la request DELETE enviada
    });
}); 