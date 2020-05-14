package be.isl.gestionlivraisons.model;

import be.isl.gestionlivraisons.model.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.UUID;

/**
 * @author Pierre-Yves Crutzen
 *
 */

@Entity
@Table(name = "orders")
public class Order {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @Column(name = "uuid")
    private UUID uuid;

    @Column(name = "mass")
    private Double mass;

    @Column(name = "volume")
    private Double volume;

    @Column(name = "calculated_price")
    private Double calculatedPrice;

    @Column(name = "delivery_address")
    private String deliveryAddress;

    @Column(name = "delivery_city")
    private String deliveryCity;

    @Column(name = "delivery_zip_code")
    private String deliveryZipCode;

    @Column(name = "delivery_country")
    private String deliveryCountry;

    @Column(name = "comment", length = 500)
    private String comment;

    @Column(name = "paid")
    private Boolean paid;

    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "validated")
    private Boolean validated; // INUTILE SI STATUS VALIDATED

    @Column(name = "validation_comment")
    private String validationComment;

    @Column(name = "validation_secret")
    private String validationSecretCode;

    /**
     * Total distance calculated including rides distances + packages detour
     */
    @Column(name = "total_distance")
    Double totalDistance;

    /* Relationships */
    
//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ride_id", nullable = false)
    private Ride ride;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // PRODUCT ID ?

    // TODO: ajout des liens

    /* c'tor */

    public Order() {
    }

    public Order(Long id,Double mass, Double volume, Double calculatedPrice, String deliveryAddress, String deliveryCity, String deliveryZipCode, String deliveryCountry, String comment, Boolean paid, OrderStatus status, Boolean validated, String validationComment,
                 String validationSecretCode, UUID uuid
     ) {
        this.id = id;
        this.mass = mass;
        this.volume = volume;
        this.calculatedPrice = calculatedPrice;
        this.deliveryAddress = deliveryAddress;
        this.deliveryCity = deliveryCity;
        this.deliveryZipCode = deliveryZipCode;
        this.deliveryCountry = deliveryCountry;
        this.comment = comment;
        this.paid = paid;
        this.status = status;
        this.validated = validated;
        this.validationComment = validationComment;
        this.validationSecretCode = validationSecretCode;
        this.uuid = uuid;
    }

    /* Getters and Setters */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonIgnore
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public UUID getUserUuid() {
        return user.getUuid();
    }

    public void setUserUUId(UUID uuid) {
        this.user.setUuid(uuid);
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

    public Double getCalculatedPrice() {
        return calculatedPrice;
    }

    public void setCalculatedPrice(Double calculatedPrice) {
        this.calculatedPrice = calculatedPrice;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getDeliveryCity() {
        return deliveryCity;
    }

    public void setDeliveryCity(String deliveryCity) {
        this.deliveryCity = deliveryCity;
    }

    public String getDeliveryZipCode() {
        return deliveryZipCode;
    }

    public void setDeliveryZipCode(String deliveryZipCode) {
        this.deliveryZipCode = deliveryZipCode;
    }

    public String getDeliveryCountry() {
        return deliveryCountry;
    }

    public void setDeliveryCountry(String deliveryCountry) {
        this.deliveryCountry = deliveryCountry;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Boolean getPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Boolean getValidated() {
        return validated;
    }

    public void setValidated(Boolean validated) {
        this.validated = validated;
    }

    public String getValidationComment() {
        return validationComment;
    }

    public void setValidationComment(String validationComment) {
        this.validationComment = validationComment;
    }

    public String getValidationSecretCode() {
        return validationSecretCode;
    }

    public void setValidationSecretCode(String validationSecretCode) {
        this.validationSecretCode = validationSecretCode;
    }

    public Double getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(Double totalDistance) {
        this.totalDistance = totalDistance;
    }

    public Ride getRide() {
        return ride;
    }

    public void setRide(Ride ride) {
        this.ride = ride;
    }
}
