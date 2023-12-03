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