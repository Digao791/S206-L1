Feature: Testando API Pokemon.

Background: Executa antes de cada teste
    * def url_base = 'https://pokeapi.co/api/v2/'
    * def url_pokedex = 'https://pokeapi.co/api/v2/pokedex'
    

Scenario: Testando retorno.
    Given url 'https://pokeapi.co/api/v2/pokemon/pikachu'
    When method get
    Then status 200

Scenario: Testando retorno people/1/ com informações inválidas.
    Given url 'https://pokeapi.co/api/v2/pokemon/chocolate'
    When method get
    Then status 404

Scenario: Testando retorno pikachu e veificando o JSON.
    Given url url_base
    And path 'pokemon/pikachu'
    When method get
    Then status 200
    And match response.name == "pikachu"
    And match response.id == 25

Scenario: Testando retorno pokemon Red e entrando em um dos elementos do array de idiomas e testando retorno JSON.
    Given url url_base
    And path 'version/1/'
    When method get
    Then status 200
    And def idioma = $.names[5].language.url 
    And print idioma   
    And url idioma
    When method get
    Then status 200
    And match response.name == "es"
    And match response.id == 7

# Validação de presença

Scenario: Testando retorno de tipo do pokémon e retorno JSON
    Given url url_base
    And path 'pokemon/lucario'
    When method get
    Then status 200
    And def tipos = $.types
    And print tipos
    And match tipos[0].type.name == "fighting"
    And match tipos[1].type.name == "steel"

Scenario: Testando retorno da região e entrando em um dos elementos do array e testando retorno JSON
    Given url url_base
    And path 'region'
    When method get
    Then status 200
    And def alola = $.results[6]
    And print alola.name
    And url alola.url
    When method get
    Then status 200
    And match response.id == 7
    And match response.name == "alola"

Scenario: Testando retorno de Pokedex nacional e entrando em um dos elementos do array e testando retorno JSON
    Given url url_pokedex
    When method get
    Then status 200
    And def pokedex = $.results[0]
    And url pokedex.url
    When method get
    Then status 200
    And match response.id == 1
    And match response.name == "national"
