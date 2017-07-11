package trees.config;

import org.neo4j.ogm.session.Session;
import org.neo4j.ogm.session.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@ComponentScan({"trees"})
public class TreesConfig {

    private static final String BOLT_DRIVER_NAME = "org.neo4j.ogm.drivers.bolt.driver.BoltDriver";
    private static final String DOMAIN_PACKAGE = "trees.domain";

    @Bean
    public org.neo4j.ogm.config.Configuration configuration() {
        org.neo4j.ogm.config.Configuration config = new org.neo4j.ogm.config.Configuration();
        config
                .driverConfiguration()
                .setDriverClassName(BOLT_DRIVER_NAME)
                .setURI("bolt://neo")
                .setEncryptionLevel("NONE")
                .setTrustCertFile("/tmp/cert");
        return config;
    }

    @Bean
    public Session session(org.neo4j.ogm.config.Configuration conf) {
        return sessionFactory(conf).openSession();
    }

    @Bean
    public SessionFactory sessionFactory(@Autowired org.neo4j.ogm.config.Configuration conf) {
        return new SessionFactory(conf, DOMAIN_PACKAGE);
    }

}