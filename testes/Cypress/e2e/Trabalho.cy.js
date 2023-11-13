/// <reference types="cypress"/> 

describe('Criando cenário de teste para o site Amazon', () => {
  it.skip('Caso de teste: Realizando cenário correto para a pesquisa de um produto', () => {
    cy.visit('https://www.amazon.com.br')
    cy.get('#twotabsearchtextbox').type(buscarProduto(false))
    cy.get('#twotabsearchtextbox').should('not.be.null')
    cy.get('#nav-search-submit-button').click()
    cy.get('.s-no-outline > .a-size-medium-plus').should('contain', 'Resultados')
  })
  it.skip('Caso de teste: Realizando cenário incorreto para a pesquisa de um produto', () => {
    cy.visit('https://www.amazon.com.br')
    cy.get('#twotabsearchtextbox').type(buscarProduto(true))
    cy.get('#twotabsearchtextbox').should('not.be.null')
    cy.get('#nav-search-submit-button').click()
    cy.get('.s-no-outline > :nth-child(1) > :nth-child(1)').should('contain', 'Nenhum resultado')
  })
  it.skip('Caso de teste: Adicionando um produto no carrinho de compras', () => {
    cy.visit('https://www.amazon.com.br/Mouse-Gamer-M7-Fortrek-Mouses/dp/B07FMF4MMP/?_encoding=UTF8&pd_rd_w=QYlmG&content-id=amzn1.sym.8fbb3d34-c3f1-46af-9d99-fd6986f6ec8f&pf_rd_p=8fbb3d34-c3f1-46af-9d99-fd6986f6ec8f&pf_rd_r=PSNNHMMTNRD97GCFD4AT&pd_rd_wg=WVuGM&pd_rd_r=532f1bde-b1ab-4239-9a9c-d2741dfb384b&ref_=pd_gw_crs_zg_bs_7791985011')
    cy.get('#productTitle').should('be.visible')
    cy.get('#quantity').select(1)
    cy.get('#add-to-cart-button').click()
    cy.get('.a-size-medium-plus').should('be.visible').should('contain', 'Adicionado ao carrinho')
  })
  it.skip('Removendo um item no carrinho de compras', ()=>{
    cy.visit('https://www.amazon.com.br/PlayStation-Controle-Dualsense-Midnight-Black/dp/B094Z7HFM5/ref=pd_vtp_sccl_3_5/133-6915324-8690617?pd_rd_w=cdIoA&content-id=amzn1.sym.4931a197-000b-43c1-8853-8cdf7dbb28a2&pf_rd_p=4931a197-000b-43c1-8853-8cdf7dbb28a2&pf_rd_r=3YEG1FNDCA3QAS093M2A&pd_rd_wg=OoNBD&pd_rd_r=7c959e63-acd2-4ee1-8bf5-9b8799b4057d&pd_rd_i=B094Z7HFM5&psc=1')
    cy.get('#productTitle').should('be.visible')
    cy.get('#add-to-cart-button').click()
    cy.get('.a-size-medium-plus').should('be.visible').should('contain', 'Adicionado ao carrinho')
    cy.get('#sw-gtc > .a-button-inner > .a-button-text').click()
    cy.get('h1').should('contain', 'Carrinho de compras')
    cy.get('.sc-action-delete > .a-declarative > .a-color-link').should('be.enabled').click()
    cy.get('.a-row > .a-spacing-mini').should('contain', 'Seu carrinho de compras da Amazon está vazio.')
  })
  it.skip('Caso de teste: Registrando um usuário com falha ( senha )', () => {
    cy.visit('https://www.amazon.com.br/ap/register?showRememberMe=true&showRmrMe=1&openid.pape.max_auth_age=0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&accountStatusPolicy=P1&pageId=webcs-yourorder&openid.return_to=https%3A%2F%2Fwww.amazon.com.br%2Fgp%2Fcss%2Forder-history%3Fie%3DUTF8%26ref_%3Dnav_orders_first&prevRID=M4624KT0PXMB7ENSD6W0&openid.assoc_handle=bramazon&openid.mode=checkid_setup&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&prepopulatedLoginId=&failedSignInCount=0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0')
    let info = criarUsuario()
    cy.get('#ap_customer_name').type(info[0])
    cy.get('#ap_email').type(info[2])
    cy.get('#ap_password').type(info[1])
    cy.get('#ap_password_check').type(info[2])
    cy.get('#continue').click()
    cy.get('#auth-password-mismatch-alert > .a-box-inner > .a-alert-content').should('contain', 'As senhas não são iguais')
  })
  it.skip('Caso de teste: Realizando um login com falha (email inexistente)', () => {
    cy.visit('https://www.amazon.com.br/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com.br%2Fref%3Dnav_ya_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=brflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0')
    cy.get('#ap_email').type('emaildeteste@teste.com')
    cy.get('.a-button-inner > #continue').click()
    cy.get('#auth-error-message-box > .a-box-inner').should('be.visible')
    cy.get('.a-list-item').should('contain', 'Não encontramos uma conta associada a este endereço de e-mail')
  })
  
})

function buscarProduto(incorreto){
  if(incorreto == true)
  {
    return "Esse produto não existe na Amazon.com confia"
  }

  let produto = ['Playstation 5', 'Meias', 'Livros', 'Televisão']
  let rand = Math.floor(Math.random()*produto.length)

  return produto[Number(rand)]
}

function criarUsuario(){
  let hora = new Date().getHours().toString()
  let minuto = new Date().getMinutes().toString()
  let segundo = new Date().getSeconds().toString()

  let user = hora + minuto + segundo + 'id'
  let senha = hora + minuto + segundo + 'senha'
  let email = "emaildeteste@emailteste.com"
  let info = [user, senha, email]
  return info
}