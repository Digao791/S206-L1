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

Scenario Outline: Testando a deleção positiva de um usuário utilizando o método DELETE
    Given url url_base
    And path '/api/users'
    And path <user>
    When method DELETE
    Then status 204

    Examples:
    |user|
    |user_1|
    |user_2|

Scenario: Testando o registro negativo de um usuário utilizando o método POST
    Given url url_base
    And path '/api/register'
    And request {email: "emailDeTeste@inatel.provaLab.br"}
    When method POST 
    Then status 400
    And match $.error == 'Missing password'

Scenario Outline: Testando a atualização de um usuário utilizando o método PUT
    Given url url_base
    And path '/api/users/'
    And path <user>
    And request {name:'<nome>', job: '<job>'}
    When method PUT 
    Then status 200

    Examples:
    |user| nome | job|
    |user_1| Rodrigo | Ryan Gosling |
    |user_2| Frederico | Batman |