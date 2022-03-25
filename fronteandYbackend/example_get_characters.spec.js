describe("Testing get characters", () => {
    it("Test get characters", () => { 
        var array = 
                cy.request({
                    method: 'GET',
                    url: 'https://restool-sample-app.herokuapp.com/api/extra',
                    form:true           
                }).then((response) => { 
                    expect(response.status).to.eq(200)
                    expect(response.body.items.name).to.not.be.null  
                    return response.body.items.id          
                });

        cy.visit("https://dsternlicht.github.io/RESTool/#/extras")
        let idArray = []
        cy.get("table > tbody>tr>td:nth-child(1)>span").should('have.length.greaterThan',0)
        cy.get("table > tbody>tr>td:nth-child(1)>span").each(($el, index, $lis) => {   
            
            cy.wrap($el).then((val) => {
                idArray.push(val.text());
                expect(array).include(val.text)                
            })
        }).then(($lis) => {
            expect($lis).to.have.length.of.at.least(1)            
        })
    })   

    it("Test POST new character", () => { 
        const uniqueSeed = Date.now().toString();       
        cy.request({
            method: 'POST',
            url: 'https://restool-sample-app.herokuapp.com/api/character',
            form:true,
            body:{
                "isAlive":false,
                "location":"Beyond the Wall",
                "name":uniqueSeed,
                "realName":"dole",
                "thumbnail":"test"
            }           
        }).then(async(response) => { 
            await expect(response.status).to.eq(200)            
            cy.viewport(1920,1080);
            cy.visit("https://dsternlicht.github.io/RESTool/#/characters?search=")
            cy.scrollTo('bottom') 
            cy.log("name created :"+response.body.name)
            cy.get('div>div:nth-child(3)>span').should('have.length.greaterThan',7)                                                          
            cy.get('div>div:nth-child(3)>span').each(($el, index, $lis) => { 
                cy.log($el.text())               
                if ($el.text() == response.body.name) {
                    cy.log('Element found')
                    return
                }                                 
            }).then(($lis) => {
                expect($lis).to.have.length.greaterThan(1)             
            })        
            cy.wait(5000)    
            cy.request({
                method: 'DELETE',
                url: 'https://restool-sample-app.herokuapp.com/api/character/'+response.body.id            
            }).then((response) => { 
                expect(response.status).to.eq(200)        
                })   
                        
        });       
    })  
})