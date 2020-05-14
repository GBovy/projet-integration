package be.isl.gestionlivraisons.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * @author Pierre-Yves Crutzen
 */

@Entity
@Table(name = "package")
public class Package {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "package_id", unique = true, nullable = false)
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "description")
    String description;

    @Column(name = "price")
    Double price;

    @Column(name = "mass")
    Double mass;

    @Column(name = "volume")
    Double volume;

    @Column(name = "pick_up_address")
    String pickUpAddress;

    @Column(name = "pick_up_city")
    String pickUpCity;

    @Column(name = "pick_up_zip_code")
    String pickUpZipCode;

    @Column(name = "pick_up_country")
    String pickUpCountry;

    @Column(name = "pick_up_date")
    String pickUpDate;

//    @Column(name = "validation_secret")
//    String validationSecretCode;

    @Column(name = "image")
    String image;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ride_id", nullable = false)
    private Ride ride;

    /* c'tor */

    public Package() {
    }

    public Package(String name, String description, Double price, Double mass, Double volume, String pickUpAddress, String pickUpZipCode, String pickUpCity, String pickUpCountry, String pickUpDate,
//       String validationSecretCode,
       String image) {
        super();
        this.name = name;
        this.description = description;
        this.price = price;
        this.mass = mass;
        this.volume = volume;
        this.pickUpAddress = pickUpAddress;
        this.pickUpZipCode = pickUpZipCode;
        this.pickUpCity = pickUpCity;
        this.pickUpCountry = pickUpCountry;
        this.pickUpDate = pickUpDate;
//        this.validationSecretCode = validationSecretCode;
        this.image = image;

    }

    /* Getters and Setters */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getPickUpZipCode() {
        return pickUpZipCode;
    }

    public void setPickUpZipCode(String pickUpZipCode) {
        this.pickUpZipCode = pickUpZipCode;
    }

    public Double getMass() {
        return mass;
    }

    public void setMass(Double mass) {
        this.mass = mass;
    }

    public Double getVolume() {
        return volume;
    }

    public void setVolume(Double volume) {
        this.volume = volume;
    }

    public String getPickUpAddress() {
        return pickUpAddress;
    }

    public void setPickUpAddress(String pickUpAddress) {
        this.pickUpAddress = pickUpAddress;
    }

    public String getPickUpCity() {
        return pickUpCity;
    }

    public void setPickUpCity(String pickUpCity) {
        this.pickUpCity = pickUpCity;
    }

    public String getPickUpCountry() {
        return pickUpCountry;
    }

    public void setPickUpCountry(String pickUpCountry) {
        this.pickUpCountry = pickUpCountry;
    }

    public String getPickUpDate() {
        return pickUpDate;
    }

    public void setPickUpDate(String pickUpDate) {
        this.pickUpDate = pickUpDate;
    }

//    public String getValidationSecretCode() {
//        return validationSecretCode;
//    }
//
//    public void setValidationSecretCode(String validationSecretCode) {
//        this.validationSecretCode = validationSecretCode;
//    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }



    public Ride getRide() {
        return ride;
    }

    public void setRide(Ride ride) {
        this.ride = ride;
    }
}
