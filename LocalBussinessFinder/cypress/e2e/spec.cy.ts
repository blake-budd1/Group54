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