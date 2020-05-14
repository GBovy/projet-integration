package be.isl.gestionlivraisons.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * @author Pierre-Yves Crutzen
 */

@Entity
@Table(name = "message")
public class Message {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "subject")
    String subject;

    @Column(name = "content")
    String content;

    /* c'tor */

    public Message() { }

    public Message(String subject, String content) {
        this.subject = subject;
        this.content = content;
    }

    /* Getters and Setters */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
