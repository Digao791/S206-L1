Feature: Testando API StarWars

Scenario: Testando retorno
    Given url 'https://swapi.dev/api/people/1/'
    When method get
    Then status 200

Scenario: Testando retorno people/1/ com informações inválidas
    Given url 'https://swapi.dev/api/people/1/12345'
    When method get
    Then status 404

Scenario: Testando retorno planets/3/ com informações válidas
    Given url 'https://swapi.dev/api/planets/3/'
    When method get
    Then status 200

Scenario: Testando retorno starships/9/ com informações inválidas
    Given url 'https://swapi.dev/api/starships/9/1010101'
    When method get
    Then status 404