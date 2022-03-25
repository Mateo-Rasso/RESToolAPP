describe('RESTool APP employees', () => {
    it('GET de employees', () => {
      var array = 
            cy.request({
            method: 'GET',
            url: 'https://restool-sample-app.herokuapp.com/api/employee?search=&page=3&limit=3',
            form:true           
        }).then((response) => { 
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            return response.body.items.id     
        })

        //cy.visit('https://dsternlicht.github.io/RESTool/#/employees?search=&page=1&limit=3')

        /*cy.get('tbody tr td:nth-child(1) > span').each(($el, index, $list) => {
            //expect(array[index]).to.equal($el.text())
        })*/

    })
})

