describe("test2",()=>{
    it('Ranking of ulbs page heading components',()=>{
        cy.visit("https://dev.cityfinance.in/fc/cfr/top-rankings");
        cy.get("input[placeholder='Search for any ULB...']")
  .should("be.visible")
  .and("have.attr", "placeholder", "Search for any ULB...");
cy.get('.mt-4.fw-bold').should("be.visible").should('have.text','Ranking of ULBs');
cy.get("section[class='text-center'] p").should('be.visible');

    })
    it('State and Population Category Functionality',()=>{
        cy.visit("https://dev.cityfinance.in/fc/cfr/top-rankings");
        cy.get('.card-clr p').should("be.visible");
        cy.contains("h6", "State Name").should("be.visible");
        cy.contains("h6", "Population Category").should("be.visible");
        cy.get('.selected-list div span:nth-child(3)')
    .should('exist') 
    .click({ force: true });  
  
    
    cy.get("input[placeholder='Search']")
    .type("Gujarat", { force: true }); 
      
    cy.get('.lazyContainer li')
    .should('exist')  
    .click();  
    cy.wait(1000);
    cy.get('span').contains('Gujarat').should('be.visible');  
    cy.get('select[formcontrolname="populationBucket"]')
    .find('option')
    .each(($option) => {
       
      cy.get('select[formcontrolname="populationBucket"]').select($option.val());
    });
   
   cy.wait(1000);

    })
    it('Radio toggle Button group functionality',()=>{
        cy.visit("https://dev.cityfinance.in/fc/cfr/top-rankings");
          const expectedLabels = [
    'Overall', 
    'Resource Mobilization', 
    'Expenditure Performance', 
    'Fiscal Governance'
  ];
  
 
  cy.get('.btn-group label').each(($label, index) => {
   
    cy.wrap($label).should('be.visible');
    const actualText = $label.text().trim();
    expect(actualText).to.equal(expectedLabels[index]);
    cy.log(`Label ${index + 1}: ${actualText}`);
    cy.wrap($label).click();
  });
  
    



    })
it("Map Functionality testing",()=>{
    cy.visit("https://dev.cityfinance.in/fc/cfr/top-rankings");
    cy.get('.stateMap').should("be.visible");
cy.get("img[alt='Marker']").should('be.visible');
cy.get("div.indicator-items div i") 
.each(($el) => {
  cy.wrap($el).should('be.visible'); 
});
   cy.get('g')   
      .find('path')          
      .each(($path) => {
        
            cy.wrap($path).trigger('mouseover', { force: true });
            cy.wait(1000);
            
           
            cy.get('b').should('exist').then(($b) => {
                if ($b.length > 0) {
                  cy.wrap($b).invoke('text')  
                    .then((text) => {
                      cy.log(text);  
                    });
                } else {
                  cy.log('No <b> element found');
                }
              });
             
         
      });

})
it("Table UI and pagination functionality testing",()=>{
    cy.visit("https://dev.cityfinance.in/fc/cfr/top-rankings");

   

   cy.wait(1000);
   cy.contains('a', 'Amdavad Municipal Corporation').invoke('removeAttr', 'target').click();
   cy.wait(1000);
   cy.get('app-ulb-details-header h3').should('include.text', 'Amdavad Municipal Corporation');

  
   cy.visit("https://dev.cityfinance.in/fc/cfr/top-rankings");
   cy.get("select[formcontrolname='populationBucket']").select("All Categories");
   cy.get('.mat-mdc-paginator-page-size-label').should('have.text',' Items per page: ')

        cy.get('mat-select').click();
        cy.get('.mat-mdc-select-panel mat-option').each(($option) => {
           
            const optionText = $option.find('span').text().trim();
            
          
            if (optionText === '5') {
          
              cy.wrap($option).click();
            }
          });
          cy.get("button[aria-label='Last page']").click();  
          cy.wait(1000);
        cy.get("button[aria-label='First page']").click();  
        cy.wait(1000);
        cy.get("button[aria-label='Next page']").click();  
          cy.wait(1000);
        cy.get("button[aria-label='Previous page']").click(); 
        cy.wait(3000);
        const expectedHeaders = [
    'Rank', 
    'ULB Name', 
    'Total ULB Score', 
    'RM Score', 
    'EP Score', 
    'FG Score'
  ];
  
  
  cy.get('thead th').each(($header, index) => {
    // cy.wrap($header).should('be.visible');
    
    const actualText = $header.text().trim();
  
    
    cy.log(`Header ${index + 1}: ${actualText}`);
  
    expect(actualText).to.equal(expectedHeaders[index]);
  });
})


  
    
    })