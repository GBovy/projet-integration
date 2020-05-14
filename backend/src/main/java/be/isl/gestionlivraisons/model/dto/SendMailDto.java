package be.isl.gestionlivraisons.model.dto;

public class SendMailDto {

    private String receiver;
    private String subject;
    private String mail;

    public String getReceiver() {
        return receiver;
    }
    public String getSubject() {
        return subject;
    }
    public String getMail() { return mail;
    }
}