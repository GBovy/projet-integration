package be.isl.gestionlivraisons.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "global_ride_price_calculation_config")
public class GlobalRidePriceCalculationConfig {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // The minimum commission asked by the enterprise
    @Column(name = "minimum_commission_by_ride", precision = 3, scale = 2, columnDefinition="DECIMAL(3,2)")
    private BigDecimal minimumComissionByRide;

    // The commission asked by kilometer
    @Column(name = "commission_by_kilometer", precision = 3, scale = 2, columnDefinition="DECIMAL(3,2)")
    private BigDecimal commissionByKilometer;

    // The drive costs for the user by kilometer
    @Column(name = "ride_cost_by_kilometer", precision = 3, scale = 2, columnDefinition="DECIMAL(3,2)")
    private BigDecimal rideCostByKilometer;

    // minPrice = distance * (1 / ratio_kilometer_min)
    @Column(name = "ratio_kilometer_min")
    private BigDecimal ratioKilometerMin;

    // maxPrice = distance * (1 / ratio_kilometer_max)
    @Column(name = "ratio_kilometer_max")
    private BigDecimal ratioKilometerMax;

    // Min gain for a user if the price is too low
    @Column(name =  "min_gain_by_user")
    private BigDecimal minGainByUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getMinimumComissionByRide() {
        return minimumComissionByRide;
    }

    public void setMinimumComissionByRide(BigDecimal minimumComissionByRide) {
        this.minimumComissionByRide = minimumComissionByRide;
    }

    public BigDecimal getCommissionByKilometer() {
        return commissionByKilometer;
    }

    public void setCommissionByKilometer(BigDecimal commissionByKilometer) {
        this.commissionByKilometer = commissionByKilometer;
    }

    public BigDecimal getRideCostByKilometer() {
        return rideCostByKilometer;
    }

    public void setRideCostByKilometer(BigDecimal rideCostByKilometer) {
        this.rideCostByKilometer = rideCostByKilometer;
    }

    public BigDecimal getRatioKilometerMin() {
        return ratioKilometerMin;
    }

    public void setRatioKilometerMin(BigDecimal ratioKilometerMin) {
        this.ratioKilometerMin = ratioKilometerMin;
    }

    public BigDecimal getRatioKilometerMax() {
        return ratioKilometerMax;
    }

    public void setRatioKilometerMax(BigDecimal ratioKilemeterMax) {
        this.ratioKilometerMax = ratioKilemeterMax;
    }

    public BigDecimal getMinGainByUser() {
        return minGainByUser;
    }

    public void setMinGainByUser(BigDecimal minGainByUser) {
        this.minGainByUser = minGainByUser;
    }
}
