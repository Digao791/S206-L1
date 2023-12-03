Feature: Realizando testes no site Reqres

Background:
    * def base_url = 'https://reqres.in'
    * def page_1 = '1'
    * def page_2 = '2'
    * def user_1 = '1'
    * def user_2 = '2'
    * def user_3 = '200'
    * def user_4 = '500'
    * def json_1 = read("usuario.json")
    * def json_2 = read("usuario2.json")
    * def registrar_usuario_valido = read("registrar_usuario1.json")
    * def registrar_usuario_invalido = read("registrar_usuario2.json")
    
Scenario: Testando resposta positiva do site
    Given url base_url
    When method get
    Then status 200

Scenario Outline: Testando retorno POSITIVO dos elementos das Páginas 1 e 2 e testando seus tipos
    Given url base_url
    And path '/api/users?page='
    And path <page>
    When method get
    Then status 200
    And match $.data == '#[]'
    And match each $.data contains {id: '#number', email: '#string', first_name: '#string', last_name: '#string'}
    Examples:
    |page|
    |page_1|
    |page_2|

Scenario Outline: Testando retorno Positivo dos usuários 1 e 2 e testando seus tipos
    Given url base_url
    And path '/api/users/'
    And path <users>
    When method get
    Then status 200
    And match $.data contains  {id: '#number', email: '#string', first_name: '#string', last_name: '#string'}

    Examples:
    |users|
    |user_1|
    |user_2|


Scenario Outline: Criando um novo usuario usando o método POST
    Given url base_url
    And path '/api/users'
    And request <json>
    When method POST
    Then status 201
    And match $.data contains  {id: '#number', email: '#string', first_name: '#string', last_name: '#string'}

    Examples:
    |json|
    |json_1|
    |json_2|

Scenario Outline: Atualizando registro de usuários usando PUT
    Given url base_url
    And path '/api/users/'
    And path <user>
    And request <json>
    When method PUT
    Then status 200
    And match $.data contains  {id: '#number', email: '#string', first_name: '#string', last_name: '#string'}

    Examples:
    |json| user |
    |json_1| user_1 |
    |json_2| user_2 |

