import { functionsIn } from "cypress/types/lodash"

describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
  })
})
describe('My Second Test', function () {
  it('fills out the registration component', function () {
    cy.visit('/')
    cy.get('#email').type('test_email@gmail.com')
    cy.get(':nth-child(2) > #username').type('test_username')
    cy.get(':nth-child(3) > #Password').type('test_password')
    cy.get(':nth-child(4) > #Password').type('test_password')
    cy.get('app-register > .container > .main > .form1 > .submit').select
  })
})
// describe('My First Test', () => {
//   it ('Does not do much!', () => {
//     expect(true).to.equal(true)
//   })
// })