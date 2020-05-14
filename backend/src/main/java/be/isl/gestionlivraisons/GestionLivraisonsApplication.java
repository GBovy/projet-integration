package be.isl.gestionlivraisons;

import be.isl.gestionlivraisons.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * @author Pierre-Yves Crutzen
 */

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class GestionLivraisonsApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionLivraisonsApplication.class, args);
    }

}
