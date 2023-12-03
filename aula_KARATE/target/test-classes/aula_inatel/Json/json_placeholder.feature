Feature: Testando resources da API json placeholder

Background: Executa uma vez antes de cada teste
    * def url_base = 'https://jsonplaceholder.typicode.com'
    * def json_request = read("json_teste.json")
    * def json_request2 = read("json_teste2.json")

Scenario: Pegando elementos do array de responde e testando seu tipo
    Given url url_base
    And path '/posts'
    When method get
    Then status 200

    And match $ == '#[]'
    And match $ == '#[100]'
    And match each $ contains {title: '#string', userId: '#number' }

Scenario Outline: Criando um novo elemento usando o método POST
    Given url url_base
    And path '/posts'
    And request <json>
    When method POST
    Then status 201
    And match $.id == 101
    And match $.title == '#string'
    And match $.body == '<body>'
    And match $.userId == '#number'

    Examples:
    |json| body |
    |json_request| body de teste |
    |json_request2| body de teste2 |
