package aula_inatel.Json;

import com.intuit.karate.junit5.Karate;

public class jsonRunner {
     @Karate.Test
    Karate testUsers() {
        return Karate.run("json_placeholder").relativeTo(getClass());
    }    
}
