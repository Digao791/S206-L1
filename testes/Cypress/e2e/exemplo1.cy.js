/// <reference types="cypress"/>

describe('Criando cenário de teste para o site globalsqa', ()=>{

  it.skip('caso de teste: Registrando um usuário no site com sucesso',()=>{
    let info = registrar_usuario()
  })
  
  it.skip('Caso de teste: Registrando um usuário com falha (faltando senha)', ()=>{
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
    cy.get('#firstName').type('inatel')
    cy.get('#Text1').type('inatel')
    cy.get('#username').type('inatel')
    cy.get('#password').type('inatel')
    cy.get('#password').clear()
    cy.get('.has-error > .help-block').should('have.text', 'Password is required')
    cy.get('.btn-primary').should('be.disabled')
  })

  it.skip('caso de teste: Realizando login com sucesso',()=>{
    let info = registrar_usuario()
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', info[0])
  })

  it('caso de teste: Realizando login com falha (faltando usuario)', ()=>{
    let info = login()
    cy.get('#username').clear()
    cy.get('.btn-primary').should('be.disabled')
    cy.get('.has-error > .help-block').should('have.text', 'Username is required')
  })

  it('caso de teste: Realizando login com falha (faltando senha)', ()=>{
    let info = login()
    cy.get('#password').clear()
    cy.get('.btn-primary').should('be.disabled')
    cy.get('.has-error > .help-block').should('have.text', 'Password is required')
  })

})

function login(){
   let info = registrar_usuario()
   cy.get('#username').type(info[0])
   cy.get('#password').type(info[1])
   return info
}

function registrar_usuario(){

  let hours = new Date().getHours().toString()
  let minutes = new Date().getMinutes().toString()
  let seconds = new Date().getSeconds().toString()
  let user = hours + minutes + seconds + 'id'
  let senha = hours + minutes + seconds + 'senha'
  let user_info =[user, senha]
  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(user)
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#password').type(senha)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return user_info
}
