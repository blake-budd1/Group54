import { functionsIn } from "cypress/types/lodash"

describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
  })
})
// describe('My Second Test', function () {
//   it('fills out the registration component', function () {
//     cy.visit('/register')
//     cy.get('#box1').type('test_email@gmail.com')
//     cy.get(':nth-child(2) > #box2').type('test_username')
//     cy.get(':nth-child(3) > #box3').type('test_password')
//     cy.get(':nth-child(4) > #box4').type('test_password')
//     cy.get('app-register > .container > .main > .form1 > .submit').select
//   })
// })
// describe('My Third Test', function (){
//   it('fills out the login component', function (){
//     cy.visit('/login')
//     cy.get('#username').type('test_user')
//     cy.get('#password').type('test_pass')
//     cy.get('app-login > .container > .main > .form1 > .submit').select
//   })
// })
// describe('Test ')
// // describe('My First Test', () => {
// //   it ('Does not do much!', () => {
// //     expect(true).to.equal(true)
// //   })
// // })
describe('Using the Navbar', () =>{
  it('Has a working navbar', () => {
    //start on home
    cy.visit('/')
    cy.url().should('include', '/Home')
    //go to login
    cy.contains('Login').click()
    cy.url().should('include', '/Login')
    //go to register
    cy.contains('Sign').click()
    cy.url().should('include', '/Register')
    //go to about us
  })
  
})
describe('Register a Buisness', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress1@gmail.com');
    cy.get('#username').type('cypress1');
    cy.get(':nth-child(3) > #Password').type('cypress1');
    cy.get(':nth-child(4) > #Password').type('cypress1');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress1');
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('body').click();

  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress2@gmail.com');
    cy.get('#username').type('cypress2');
    cy.get(':nth-child(3) > #Password').type('cypress2');
    cy.get(':nth-child(4) > #Password').type('cypress2');
    cy.get('.submit').click();
    cy.get('.name').type('Feline Good Cat Cafe');
    cy.get('.Address > input').type('201 SE 2nd Pl, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(1) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress3@gmail.com');
    cy.get('#username').type('cypress3');
    cy.get(':nth-child(3) > #Password').type('cypress3');
    cy.get(':nth-child(4) > #Password').type('cypress3');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress3');
    cy.get('.Address > input').type('Cypress3, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(2) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress4@gmail.com');
    cy.get('#username').type('cypress4');
    cy.get(':nth-child(3) > #Password').type('cypress4');
    cy.get(':nth-child(4) > #Password').type('cypress4');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress4');
    cy.get('.Address > input').type('Cypress4, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(4) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress5@gmail.com');
    cy.get('#username').type('cypress5');
    cy.get(':nth-child(3) > #Password').type('cypress5');
    cy.get(':nth-child(4) > #Password').type('cypress5');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress5');
    cy.get('.Address > input').type('Cypress5, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(5) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress6@gmail.com');
    cy.get('#username').type('cypress6');
    cy.get(':nth-child(3) > #Password').type('cypress6');
    cy.get(':nth-child(4) > #Password').type('cypress6');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress6');
    cy.get('.Address > input').type('Cypress6, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(6) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress7@gmail.com');
    cy.get('#username').type('cypress7');
    cy.get(':nth-child(3) > #Password').type('cypress7');
    cy.get(':nth-child(4) > #Password').type('cypress7');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress7');
    cy.get('.Address > input').type('Cypress7, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(7) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress8@gmail.com');
    cy.get('#username').type('cypress8');
    cy.get(':nth-child(3) > #Password').type('cypress8');
    cy.get(':nth-child(4) > #Password').type('cypress8');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress8');
    cy.get('.Address > input').type('Cypress8, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(8) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress9@gmail.com');
    cy.get('#username').type('cypress9');
    cy.get(':nth-child(3) > #Password').type('cypress9');
    cy.get(':nth-child(4) > #Password').type('cypress9');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress9');
    cy.get('.Address > input').type('Cypress9, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(9) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress10@gmail.com');
    cy.get('#username').type('cypress10');
    cy.get(':nth-child(3) > #Password').type('cypress10');
    cy.get(':nth-child(4) > #Password').type('cypress10');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress10');
    cy.get('.Address > input').type('Cypress10, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(10) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress11@gmail.com');
    cy.get('#username').type('cypress11');
    cy.get(':nth-child(3) > #Password').type('cypress11');
    cy.get(':nth-child(4) > #Password').type('cypress11');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress11');
    cy.get('.Address > input').type('Cypress11, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(11) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress12@gmail.com');
    cy.get('#username').type('cypress12');
    cy.get(':nth-child(3) > #Password').type('cypress12');
    cy.get(':nth-child(4) > #Password').type('cypress12');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress12');
    cy.get('.Address > input').type('Cypress12, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(12) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress13@gmail.com');
    cy.get('#username').type('cypress13');
    cy.get(':nth-child(3) > #Password').type('cypress13');
    cy.get(':nth-child(4) > #Password').type('cypress13');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress13');
    cy.get('.Address > input').type('Cypress13, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(13) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress14@gmail.com');
    cy.get('#username').type('cypress14');
    cy.get(':nth-child(3) > #Password').type('cypress14');
    cy.get(':nth-child(4) > #Password').type('cypress14');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress14');
    cy.get('.Address > input').type('Cypress14, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(14) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress15@gmail.com');
    cy.get('#username').type('cypress15');
    cy.get(':nth-child(3) > #Password').type('cypress15');
    cy.get(':nth-child(4) > #Password').type('cypress15');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress15');
    cy.get('.Address > input').type('Cypress15, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(15) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress16@gmail.com');
    cy.get('#username').type('cypress16');
    cy.get(':nth-child(3) > #Password').type('cypress16');
    cy.get(':nth-child(4) > #Password').type('cypress16');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress16');
    cy.get('.Address > input').type('Cypress16, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(16) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress17@gmail.com');
    cy.get('#username').type('cypress17');
    cy.get(':nth-child(3) > #Password').type('cypress17');
    cy.get(':nth-child(4) > #Password').type('cypress17');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress17');
    cy.get('.Address > input').type('Cypress17, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(17) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress18@gmail.com');
    cy.get('#username').type('cypress18');
    cy.get(':nth-child(3) > #Password').type('cypress18');
    cy.get(':nth-child(4) > #Password').type('cypress18');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress18');
    cy.get('.Address > input').type('Cypress18, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(2) > div').click();
    cy.get('.item2 > :nth-child(3) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress19@gmail.com');
    cy.get('#username').type('cypress19');
    cy.get(':nth-child(3) > #Password').type('cypress19');
    cy.get(':nth-child(4) > #Password').type('cypress19');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress19');
    cy.get('.Address > input').type('Cypress19, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(2) > div').click();
    cy.get('.item2 > :nth-child(4) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
describe('Register a Buisness and fill out form', () => {
  it('Works with Backend', () => {
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress20@gmail.com');
    cy.get('#username').type('cypress20');
    cy.get(':nth-child(3) > #Password').type('cypress20');
    cy.get(':nth-child(4) > #Password').type('cypress20');
    cy.get('.submit').click();
    cy.get('.name').type('Cypress20');
    cy.get('.Address > input').type('Cypress20, Suite 113 Gainesville, FL, 32601');
    cy.get('.textarea-inline-control').type('description');
    cy.get('.dropdown-btn').click();
    cy.get('.item2 > :nth-child(2) > div').click();
    cy.get('.item2 > :nth-child(5) > div').click();
    cy.get('.submit_button_area > .nextImg_3').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.preview_button_area > .nextImg_3').click();
  })
})
