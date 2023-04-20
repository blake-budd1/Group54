describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
describe('Can edit Buisness', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress2');
    cy.get('#Password').type('cypress2');
    cy.get('.submit').click();
    cy.get('body').click();
    cy.get('.preview_button_area > .nextImg_3').click();

  })
})
describe('Can edit Buisness', () => {
  it('Can Edit All & Submit', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress2');
    cy.get('#Password').type('cypress2');
    cy.get('.submit').click();
    cy.get('body').click();
    cy.get('.preview_button_area > .nextImg_3').click();
    cy.get('.close').click();
    cy.get('.name').type('CHANGED');
    cy.get('.Address > input').type('CHANGED 201 SE 2nd Pl, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('CHANGED description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(3) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('body').click();
    cy.get('.preview_button_area > .nextImg_3').click();
    })
})
describe('Can edit Buisness Multiple Times', () => {
  it('Can Edit All & Submit', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress2');
    cy.get('#Password').type('cypress2');
    cy.get('.submit').click();
    cy.get('body').click();
    cy.get('.preview_button_area > .nextImg_3').click();
    cy.get('.close').click();
    cy.get('.name').type('CHANGED');
    cy.get('.Address > input').type('CHANGED 201 SE 2nd Pl, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('CHANGED description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(3) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('body').click();
    cy.get('.preview_button_area > .nextImg_3').click();
    cy.get('.close').click();
    cy.get('.mdc-button--raised > .mdc-button__label').click();
    cy.contains('Login').click();
    cy.get('#username').type('cypress2');
    cy.get('#Password').type('cypress2');
    cy.get('.submit').click();

    cy.get('.name').type('CHANGED2');
    cy.get('.Address > input').type('CHANGED2 201 SE 2nd Pl, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('CHANGED2 description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(4) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('body').click();
    cy.get('.preview_button_area > .nextImg_3').click();
    cy.get('.close').click();
    cy.get('.mdc-button--raised > .mdc-button__label').click();
    cy.contains('Login').click();
    cy.get('#username').type('cypress2');
    cy.get('#Password').type('cypress2');
    cy.get('.submit').click();

    cy.get('.name').type('CHANGED3');
    cy.get('.Address > input').type('CHANGED3 201 SE 2nd Pl, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('CHANGED3 description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(5) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('body').click();
    cy.get('.preview_button_area > .nextImg_3').click();
    cy.get('.close').click();
    cy.get('.mdc-button--raised > .mdc-button__label').click();
    cy.contains('Login').click();
    cy.get('#username').type('cypress2');
    cy.get('#Password').type('cypress2');
    cy.get('.submit').click();

    cy.get('.name').type('CHANGED4');
    cy.get('.Address > input').type('CHANGED4 201 SE 2nd Pl, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('CHANGED4 description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(5) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('body').click();
    cy.get('.preview_button_area > .nextImg_3').click();
    cy.get('.close').click();
    cy.get('.mdc-button--raised > .mdc-button__label').click();
    cy.contains('Login').click();
    cy.get('#username').type('cypress2');
    cy.get('#Password').type('cypress2');
    cy.get('.submit').click();

    cy.get('.name').type('CHANGED5');
    cy.get('.Address > input').type('CHANGED5 201 SE 2nd Pl, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('CHANGED5 description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(6) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('body').click();
    cy.get('.preview_button_area > .nextImg_3').click();
    })
})
describe('Can edit Buisness', () => {
  it('After edit, should find in search', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    cy.get('.search_button').click();
    cy.get('.dropdown-btn').click();
    cy.get(':nth-child(6) > div').click();
    cy.get('.submit_button').click();
    cy.get(':nth-child(2) > .businessButton').click();
    cy.get('.header-1').contains('CHANGED5');
    })
})

