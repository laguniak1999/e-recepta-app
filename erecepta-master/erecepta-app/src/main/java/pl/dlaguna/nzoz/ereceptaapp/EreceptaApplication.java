package pl.dlaguna.nzoz.ereceptaapp;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ComponentScan(basePackages = "pl.dlaguna")
@ImportResource("classpath:cxf.xml")
public class EreceptaApplication {
    public static void main(String[] args) {
        SpringApplication.run(EreceptaApplication.class, args);
    }
}
