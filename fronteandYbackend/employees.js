// ------------------------------------------------------------- Ejercicio 4 ---------------------------------------------------------

//------------------------ Realizar un POST al endpoint de employees y validar su creacion en el frontend -----------------------------

import RestoolApp from '../pageObjects/RestoolApp';

describe('RESTool APP employees', () => {

    let restoolObject = new RestoolApp;

    it('POST al endpoint de employees y validamos su creacion en el frontend', () => {

       let employeeId = cy.request({
            method: 'POST',
            url: 'https://restool-sample-app.herokuapp.com/api/employee',
            form: true,
            body:{
                id: '0001',
                name: 'Juan Carlos',
                jobTitle: 'RESTool creator 😎',
                isFired: true
            }
        }).then((response) => {
            expect(response.status).to.be.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body.id).to.be.eq('0001')
            expect(response.body.name).to.be.eq('Juan Carlos')
            expect(response.body.jobTitle).to.be.eq('RESTool creator 😎')
            //expect(response.body.isFired).to.be.true
            return response.body.id
            })

        restoolObject.visitEmployees();

        /*cy.get('#root > div > div.app-page > main > div > table > tbody > tr td:nth-child(1) > span').each(($el, $index, $list) => {
            if(employeeId == $el.text){
            }
        })*/

    });
});

