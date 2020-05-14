package be.isl.gestionlivraisons.model.dto;

public class CalculateDto {

    private String distance;
    private String volume;
    private String mass;
    private String rideCost;
    private String commission;
    private Double price;
    private String minimumPrice;
    private String maximumPrice;
    private String totalGain;
    private Double maximumDistance;

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public String getMass() {
        return mass;
    }

    public void setMass(String mass) {
        this.mass = mass;
    }

    public String getRideCost() {
        return rideCost;
    }

    public void setRideCost(String rideCost) {
        this.rideCost = rideCost;
    }

    public String getCommission() {
        return commission;
    }

    public void setCommission(String commission) {
        this.commission = commission;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getMinimumPrice() {
        return minimumPrice;
    }

    public void setMinimumPrice(String minimumPrice) {
        this.minimumPrice = minimumPrice;
    }

    public String getMaximumPrice() {
        return maximumPrice;
    }

    public void setMaximumPrice(String maximumPrice) {
        this.maximumPrice = maximumPrice;
    }

    public String getTotalGain() {
        return totalGain;
    }

    public void setTotalGain(String totalGain) {
        this.totalGain = totalGain;
    }

    public Double getMaximumDistance() {
        return maximumDistance;
    }

    public void setMaximumDistance(Double maximumDistance) {
        this.maximumDistance = maximumDistance;
    }
}
