package trees.main;

import static org.springframework.boot.SpringApplication.run;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import trees.config.TreesConfig;

@SpringBootApplication
public class TreesServer {

    public static void main(String[] args) {
        run(TreesConfig.class, args);
    }

}
