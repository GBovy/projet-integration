package be.isl.gestionlivraisons.model;

import javax.persistence.*;

/**
 * @author Pierre-Yves Crutzen
 */

@Entity
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "green_card_number")
    String greenCardNumber;

    @Column(name = "insurance")
    String insurance;

    @Column(name = "matriculation_number")
    String matriculationNumber;

    @Column(name = "max_mass")
    String maxMass;

    @Column(name = "max_volume")
    String maxVolume;

    @Column(name = "vehicle_type")
    String vehicleType;

    @Column(name = "vehicle_year")
    String vehicleYear;

    /* c'tor */

    public Vehicle() { }

    public Vehicle(String greenCardNumber, String insurance, String matriculationNumber, String maxMass, String maxVolume, String vehicleType, String vehicleYear) {
        super();
        this.greenCardNumber = greenCardNumber;
        this.insurance = insurance;
        this.matriculationNumber = matriculationNumber;
        this.maxMass = maxMass;
        this.maxVolume = maxVolume;
        this.vehicleType = vehicleType;
        this.vehicleYear = vehicleYear;
    }

    /* Getters and Setters */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGreenCardNumber() {
        return greenCardNumber;
    }

    public void setGreenCardNumber(String greenCardNumber) {
        this.greenCardNumber = greenCardNumber;
    }

    public String getInsurance() {
        return insurance;
    }

    public void setInsurance(String insurance) {
        this.insurance = insurance;
    }

    public String getMatriculationNumber() {
        return matriculationNumber;
    }

    public void setMatriculationNumber(String matriculationNumber) {
        this.matriculationNumber = matriculationNumber;
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

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getVehicleYear() {
        return vehicleYear;
    }

    public void setVehicleYear(String vehicleYear) {
        this.vehicleYear = vehicleYear;
    }
}
