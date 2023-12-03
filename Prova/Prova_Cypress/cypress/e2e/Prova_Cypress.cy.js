/// <reference types="cypress"/> 

describe("Criando cenário de teste para o site da ComputerDatabase", () => {
  it("Criando caso de teste positivo: Acessando o site", () => {
    cy.visit('https://computer-database.gatling.io/computers')
    cy.get('h1.fill > .fill').should('be.visible')
  })
  it("Criando caso de teste positivo: Adicionando um novo computador", () => {
    cy.visit('https://computer-database.gatling.io/computers')
    registrar_computador()
    cy.get('.primary').click()
    cy.get('.alert-message').should('contain', 'has been created')
  })
 
  it("Criando caso de teste negativo: Registro incorreto de um novo computador", () => {
    cy.visit('https://computer-database.gatling.io/computers')
    registrar_computador()
    cy.get('#name').clear()
    cy.get('.primary').click()
    cy.get('.error > .input > .help-inline').should('contain', 'Failed to refine type : Predicate isEmpty() did not fail')
  })

  it("Criando caso de teste positivo: Procurando por um computador e o atualizando", () => {
    cy.visit('https://computer-database.gatling.io/computers')
    cy.get('#searchbox').type("Atari")
    cy.get('#searchsubmit').click()
    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click()
    cy.get('#main > h1').should('be.visible').should('have.text', "Edit computer")
    cy.get('#company').select("Atari")
    cy.get('.primary').click()
    cy.get('.alert-message').should('be.visible').should('contain', 'has been updated')
  })

})


function registrar_computador(){
  let nome = new Date().getHours().toString()
  let ano = new Date().getFullYear().toString()
  let mes = new Date().getMonth().toString()
  let dia = new Date().getDate().toString()
  
  if (dia.length == 1){
    dia = '0' + dia 
  }

  if (mes.length == 1){
    mes =  '0' + mes
  }

  cy.get('h1.fill > .fill').should('be.visible')
  cy.get('#add').click()
  cy.get('#main > h1').should('be.visible').should('have.text', 'Add a computer')
  cy.get('#name').type("Computador" + nome)
  cy.get('#introduced').type(ano + '-' + mes + '-' + dia)
  cy.get('#discontinued').type('3000' + '-' + mes + '-' + dia)
  cy.get('#company').select("Sony")
  

  
}