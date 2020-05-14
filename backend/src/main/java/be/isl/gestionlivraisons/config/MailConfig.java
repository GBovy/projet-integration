package be.isl.gestionlivraisons.config;

import java.util.Properties;

import be.isl.gestionlivraisons.model.dto.UserDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

    public UserDto mailData;

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
/*
        System.out.println(" password password password password password password password password  " );
        System.out.println(" password : " + this.mailData.getEmail_password());
        System.out.println(" password password password password password password password password  " );
*/

        mailSender.setUsername("g.c.bovy@gmail.com");//adresse mail expediteur // g.c.bovy@gmail.com
        mailSender.setPassword("rlxsxbpvjfrigbrq");//mot de passe pour application // rlxsxbpvjfrigbrq

        /*userName.ifPresent(name -> sender.setUsername(name));
        if (this.mailData.getEmail().length() > 0) {
            mailSender.setUsername(this.mailData.getEmail());
        }
        */
/*
        mailSender.setUsername(this.mailData.getCountry());
        mailSender.setPassword(this.mailData.getEmail_password());
*/
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
