package be.isl.gestionlivraisons.controller;

import be.isl.gestionlivraisons.repository.UserRepository;
import be.isl.gestionlivraisons.model.dto.UserDto;
import be.isl.gestionlivraisons.config.MailConfig;
import be.isl.gestionlivraisons.model.dto.SendMailDto;
import be.isl.gestionlivraisons.security.CurrentUser;
import be.isl.gestionlivraisons.security.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class EmailController {

    private final UserRepository userRepository;

    public EmailController(
            final UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Autowired
    public JavaMailSender emailSender;

    @ResponseBody
    @PostMapping("/user/sendMail")
    public void sendEmail(@CurrentUser UserPrincipal userPrincipal,
                          @RequestBody SendMailDto sendMailDto)
    {
        MailConfig MailData = new MailConfig();

        UserDto sendMail = new UserDto(userRepository.findById(userPrincipal.getId()).get());
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(sendMailDto.getReceiver());
        message.setSubject(sendMailDto.getSubject());
        message.setText(sendMailDto.getMail());

        this.emailSender.send(message);
    }

}
