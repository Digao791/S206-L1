package aula_inatel.Pokémon;

import com.intuit.karate.junit5.Karate;

class pokemonRunner {
    
    @Karate.Test
    Karate testUsers() {
        return Karate.run("pokemon").relativeTo(getClass());
    }    

}