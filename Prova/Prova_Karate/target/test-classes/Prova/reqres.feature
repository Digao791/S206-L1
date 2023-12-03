Feature: Realizando testes no site Reqres

Background:
    * def url_base = 'https://reqres.in'
    * def user_1 = '1'
    * def user_2 = '2'

Scenario: Testando retorno positivo do site
    Given url url_base
    When method get 
    Then status 200

Scenario: Testando retorno positivo da lista de usuários utilizando o método GET e validando seus tipos
    Given url url_base
    And path '/api/users'
    When method get 
    Then status 200
    And match $.data == '#[]'
    And match each $.data contains {id:'#number', email: '#string', first_name: '#string', last_name:'#string', avatar: '#string'}

Scenario Outline: Testando retorno positivo de um usuário específico utilizando o método GET e validando seus tipos
    Given url url_base
    And path '/api/users/'
    And path <user>
    When method get 
    Then status 200
    And match $.data.id == '#number'
    And match $.data.email == '#string'
    And match $.data.first_name == '#string'
    And match $.data.last_name == '#string'
    And match $.data.avatar == '#string'

    Examples:
    |user|
    |user_1|
    |user_2|

Scenario: Testando a criação positiva de um usuário utilizando o método POST
    Given url url_base
    And path '/api/users'
    And request {name:"Rodrigo", job: "Batman"}
    When method POST 
    Then status 201
    And match response.id == '#string'
    And match response.name == 'Rodrigo'

