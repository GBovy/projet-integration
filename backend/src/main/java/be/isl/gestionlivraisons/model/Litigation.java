package be.isl.gestionlivraisons.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * @author Pierre-Yves Crutzen
 */

@Entity
@Table(name = "litigation")
public class Litigation {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "closed")
    Boolean closed;

    @Column(name = "payback")
    Double payback;

    /* c'tor */

    public Litigation() { }

    public Litigation(Boolean closed, Double payback) {
        this.closed = closed;
        this.payback = payback;
    }

    /* Getters and Setters */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getClosed() {
        return closed;
    }

    public void setClosed(Boolean closed) {
        this.closed = closed;
    }

    public Double getPayback() {
        return payback;
    }

    public void setPayback(Double payback) {
        this.payback = payback;
    }
}
