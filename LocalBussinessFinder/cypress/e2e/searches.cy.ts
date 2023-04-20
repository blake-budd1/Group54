describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
describe('Selects a tag and chekcs 1st element, deselects tag and 1st element should be changed', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.get('.search_button').click();
    cy.get('.dropdown-btn').click();
    cy.get(':nth-child(6) > div').click();
    cy.get('.submit_button').click();
    cy.get(':nth-child(2) > .businessButton').click();
    cy.get('.header-1').contains('CHANGED5');
    cy.get('.close').click();
    cy.get('.dropdown-btn').click();
    cy.get(':nth-child(6) > div').click();
    cy.get('.submit_button').click();
    cy.get(':nth-child(2) > .businessButton').click();
    cy.get('.header-1').contains('Cypress1');
  })
})
describe('Selects 2 tags- Should display buisness with those two tags', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.get('.search_button').click();
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(2) > div').click();
    cy.get('.item2 > :nth-child(5) > div').click();
    cy.get('.submit_button').click();
    cy.get(':nth-child(2) > .businessButton').click();
    cy.get('.div_mid > :nth-child(1) > .nextImg_2').contains('Clothing');
    cy.get('.div_mid > :nth-child(2) > .nextImg_2').contains('Cafe');
  })
})
describe('Selecting more than 5 tags should not display anything', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.get('.search_button').click();
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(1) > div').click();
    cy.get('.item2 > :nth-child(2) > div').click();
    cy.get('.item2 > :nth-child(3) > div').click();
    cy.get('.item2 > :nth-child(4) > div').click();
    cy.get('.item2 > :nth-child(5) > div').click();
    cy.get('.item2 > :nth-child(6) > div').click();
    cy.get('.submit_button').click();
    cy.get(':nth-child(2) > .businessButton').should('not.exist');
  })
})
describe('Selecting more than 5 tags- then revert back to two', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.get('.search_button').click();
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(1) > div').click();
    cy.get('.item2 > :nth-child(2) > div').click();
    cy.get('.item2 > :nth-child(3) > div').click();
    cy.get('.item2 > :nth-child(4) > div').click();
    cy.get('.item2 > :nth-child(5) > div').click();
    cy.get('.item2 > :nth-child(6) > div').click();
    cy.get('.submit_button').click();
    cy.get(':nth-child(2) > .businessButton').should('not.exist');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(1) > div').click();
    cy.get('.item2 > :nth-child(4) > div').click();
    cy.get('.item2 > :nth-child(5) > div').click();
    cy.get('.item2 > :nth-child(6) > div').click();
    cy.get('.submit_button').click();
    cy.get(':nth-child(2) > .businessButton').should('exist');
  })
})
describe('Searching for business w/specific tags', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.get('.search_button').click();
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(4) > div').click();
    cy.get('.item2 > :nth-child(5) > div').click();
    cy.get('.item2 > :nth-child(8) > div').click();
    cy.get('.submit_button').click();
    cy.get(':nth-child(2) > .businessButton').should('exist');
    cy.get('.businessButton').click();
    cy.get('.header-1').contains("Feeline Good Cat Cafe");
  })
})
describe('Searching for business w/specific tags then clicking though images', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.get('.search_button').click();
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(4) > div').click();
    cy.get('.item2 > :nth-child(5) > div').click();
    cy.get('.item2 > :nth-child(8) > div').click();
    cy.get('.submit_button').click();
    cy.get(':nth-child(2) > .businessButton').should('exist');
    cy.get('.businessButton').click();
    cy.get('.header-1').contains("Feeline Good Cat Cafe");
    cy.get('.nextImg').click();
    cy.wait(500);
    cy.get('.nextImg').click();
    cy.wait(500);
  })
})
