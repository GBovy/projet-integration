package be.isl.gestionlivraisons.model.dto;

import java.util.UUID;

/**
 * @author Pierre-Yves Crutzen
 */

public class OrderDto {

    private UUID uuid;
    //    String id;
    Double mass;
    Double volume;
    Double calculatedPrice;
    String deliveryAddress;
    String deliveryCity;
    String deliveryZipCode;
    String deliveryCountry;
    String comment;
//    Boolean paid;// INUTILE?
//    OrderStatus status;
//    Boolean validated; // INUTILE SI STATUS VALIDATED
//    String validationComment;
//    String validationSecretCode;

//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
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

    public UUID getUuid() {
        return uuid;
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

//    public String getPaid() {
//        return paid;
//    }
//
//    public void setPaid(String paid) {
//        this.paid = paid;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//
//    public String getValidated() {
//        return validated;
//    }
//
//    public void setValidated(String validated) {
//        this.validated = validated;
//    }
//
//    public String getValidationComment() {
//        return validationComment;
//    }
//
//    public void setValidationComment(String validationComment) {
//        this.validationComment = validationComment;
//    }
//
//    public String getValidationSecretCode() {
//        return validationSecretCode;
//    }
//
//    public void setValidationSecretCode(String validationSecretCode) {
//        this.validationSecretCode = validationSecretCode;
//    }
}
