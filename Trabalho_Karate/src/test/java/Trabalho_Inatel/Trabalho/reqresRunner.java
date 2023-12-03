package Trabalho_Inatel.Trabalho;

import com.intuit.karate.junit5.Karate;

public class reqresRunner {
    @Karate.Test
    Karate testUsers() {
        return Karate.run("reqres").relativeTo(getClass());
    }   
}
