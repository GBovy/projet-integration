package be.isl.gestionlivraisons.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.jdbc.datasource.DataSourceTransactionManager;

/**
 * @author Pierre-Yves Crutzen
 */

@Configuration
//@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "be.isl.gestionlivraisons.repository")
@EntityScan(basePackages = "be.isl.gestionlivraisons.model")
public class JpaConfiguration { }
