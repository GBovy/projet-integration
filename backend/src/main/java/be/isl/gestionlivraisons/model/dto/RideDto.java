package be.isl.gestionlivraisons.model.dto;

import java.util.UUID;

public class RideDto {

    private Long id;
    //    private Double calculatedDetour;
    private String startingAddress;
    private String startingCity;
    private String startingZipCode;
    private String startingCountry;
    private String deliveryDate;
    private String destinationAddress;
    private String destinationCity;
    private String destinationZipCode;
    private String destinationCountry;
    private String maxMass;
    private String maxVolume;
    private Double price;
    private String distance;
    private String duration;
    private String deliveryType;
    private Double maximumDistance;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public Double getCalculatedDetour() {
//        return calculatedDetour;
//    }
//
//    public void setCalculatedDetour(Double calculatedDetour) {
//        this.calculatedDetour = calculatedDetour;
//    }

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

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(String deliveryType) {
        this.deliveryType = deliveryType;
    }

    public Double getMaximumDistance() {
        return maximumDistance;
    }

    public void setMaximumDistance(Double maximumDistance) {
        this.maximumDistance = maximumDistance;
    }
}
