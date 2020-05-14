package be.isl.gestionlivraisons.model;

import be.isl.gestionlivraisons.model.enums.DeliveryType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

/**
 * @author Pierre-Yves Crutzen
 *
 */

@Entity
@Table(name = "ride")
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ride_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "calculated_detour")
    private Double calculatedDetour;

    @Column(name = "delivery_date")
    private String deliveryDate;

    @Column(name = "destination_address")
    private String destinationAddress;

    @Column(name = "destination_city")
    private String destinationCity;

    @Column(name = "destination_zip_code")
    private String destinationZipCode;

    @Column(name = "destination_country")
    private String destinationCountry;

    @Column(name = "max_mass")
    private String maxMass;

    @Column(name = "max_volume")
    private String maxVolume;

    @Column(name = "price")
    private Double price;

    @Column(name = "starting_address")
    private String startingAddress;

    @Column(name = "starting_city")
    private String startingCity;

    @Column(name = "starting_zip_code")
    private String startingZipCode;

    @Column(name = "starting_country")
    private String startingCountry;

    @Column(name = "distance")
    private Double distance;

    @Column(name = "duration")
    private Double duration;

    @Column(name = "delivery_type")
    private DeliveryType deliveryType;

    @Column(name = "max_distance")
    private BigDecimal maximumDistance;

    /* Entity relationships */

//    @JsonIgnore
    @OneToMany(mappedBy = "ride")
    private Set<Package> packages;

    @JsonIgnore
    @OneToMany(mappedBy = "ride")
    private Set<Order> orders;

    /* c'tor */

    public Ride() { }

    public Ride(final Double calculatedDetour,
                final String deliveryDate,
                final String destinationAddress,
                final String destinationCity,
                final String destinationZipCode,
                final String destinationCountry,
                final String maxMass,
                final String maxVolume,
                final Double price,
                final String startingAddress,
                final String startingCity,
                final String startingZipCode,
                final String startingCountry,
                final  Double distance,
                final Double duration,
                final DeliveryType deliveryType) {
        super();
        this.calculatedDetour = calculatedDetour;
        this.deliveryDate = deliveryDate;
        this.destinationAddress = destinationAddress;
        this.destinationCity = destinationCity;
        this.destinationZipCode = destinationZipCode;
        this.destinationCountry = destinationCountry;
        this.maxMass = maxMass;
        this.maxVolume = maxVolume;
        this.price = price;
        this.startingAddress = startingAddress;
        this.startingCity = startingCity;
        this.startingZipCode = startingZipCode;
        this.startingCountry = startingCountry;
        this.distance = distance;
        this.duration = duration;
        this.deliveryType = deliveryType;
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

    public UUID getUserUuid() {
        return user.getUuid();
    }

    public void setUserUUId(UUID uuid) {
        this.user.setUuid(uuid);
    }

    public Double getCalculatedDetour() {
        return calculatedDetour;
    }

    public void setCalculatedDetour(Double calculatedDetour) {
        this.calculatedDetour = calculatedDetour;
    }

    public String getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(String deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getDestinationAddress() {
        return destinationAddress;
    }

    public void setDestinationAddress(String destinationAddress) {
        this.destinationAddress = destinationAddress;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public String getDestinationZipCode() {
        return destinationZipCode;
    }

    public void setDestinationZipCode(String destinationZipCode) {
        this.destinationZipCode = destinationZipCode;
    }

    public String getDestinationCountry() {
        return destinationCountry;
    }

    public void setDestinationCountry(String destinationCountry) {
        this.destinationCountry = destinationCountry;
    }

    public String getMaxMass() {
        return maxMass;
    }

    public void setMaxMass(String maxMass) {
        this.maxMass = maxMass;
    }

    public String getMaxVolume() {
        return maxVolume;
    }

    public void setMaxVolume(String maxVolume) {
        this.maxVolume = maxVolume;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getStartingAddress() {
        return startingAddress;
    }

    public void setStartingAddress(String startingAddress) {
        this.startingAddress = startingAddress;
    }

    public String getStartingCity() {
        return startingCity;
    }

    public void setStartingCity(String startingCity) {
        this.startingCity = startingCity;
    }

    public String getStartingZipCode() {
        return startingZipCode;
    }

    public void setStartingZipCode(String startingZipCode) {
        this.startingZipCode = startingZipCode;
    }

    public String getStartingCountry() {
        return startingCountry;
    }

    public void setStartingCountry(String startingCountry) {
        this.startingCountry = startingCountry;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public Double getDuration() {
        return duration;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public DeliveryType getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(DeliveryType deliveryType) {
        this.deliveryType = deliveryType;
    }

    public BigDecimal getMaximumDistance() {
        return maximumDistance;
    }

    public void setMaximumDistance(BigDecimal maximumDistance) {
        this.maximumDistance = maximumDistance;
    }

    public Set<Package> getPackages() {
        return packages;
    }

    public void setPackages(Set<Package> packages) {
        this.packages = packages;
    }

    /* Entity relationships getters and setters */

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }
}
