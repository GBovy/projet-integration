package be.isl.gestionlivraisons.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * @author Pierre-Yves Crutzen
 */

@Entity
@Table(name = "marketing")
public class Marketing {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "commission")
    Double commission;

    @Column(name = "discount")
    Double discount;

    /* c'tor */

    public Marketing() { }

    public Marketing(Double commission, Double discount) {
        super();
        this.commission = commission;
        this.discount = discount;
    }

    /* Getters and setters */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getCommission() {
        return commission;
    }

    public void setCommission(Double commission) {
        this.commission = commission;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }
}
