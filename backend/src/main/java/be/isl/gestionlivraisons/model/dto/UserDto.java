package be.isl.gestionlivraisons.model.dto;

import be.isl.gestionlivraisons.model.User;
import be.isl.gestionlivraisons.model.enums.AccessRole;
import be.isl.gestionlivraisons.model.enums.UserRole;

import java.util.UUID;

/**
 * @author Pierre-Yves Crutzen
 */

public class UserDto extends User {

    private UUID uuid;
    private String lastname;
    private String firstname;
    private String email;
    private String password;
    private String address;
    private String city;
    private String zipCode;
    private String country;
    private String bankingAccount;
    private String paypal;
    private String vehicleModel;
    private String vehicleYear;
    private String imageUrl;
    private String email_password;
    private Boolean profileCompleted;

    private UserRole userRole;
    private AccessRole accessRole;

    public UserDto() { }

    public UserDto(User user) {
        this.uuid = user.getUuid();
        this.lastname = user.getLastname();
        this.firstname = user.getFirstname();
        this.email = user.getEmail();
        this.address = user.getAddress();
        this.city = user.getCity();
        this.zipCode = user.getZipCode();
        this.country = user.getCountry();
        this.bankingAccount = user.getBankingAccount();
        this.paypal = user.getPaypal();
        this.vehicleModel = user.getVehicleModel();
        this.vehicleYear = user.getVehicleYear();
        this.imageUrl = user.getImageUrl();
        this.profileCompleted = user.getProfileCompleted();
        this.userRole = user.getUserRole();
        this.accessRole = user.getAccessRole();
        this.email_password = user.getEmail_password();
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getBankingAccount() {
        return bankingAccount;
    }

    public void setBankingAccount(String bankingAccount) {
        this.bankingAccount = bankingAccount;
    }

    public String getPaypal() {
        return paypal;
    }

    public void setPaypal(String paypal) {
        this.paypal = paypal;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public String getVehicleYear() {
        return vehicleYear;
    }

    public void setVehicleYear(String vehicleYear) {
        this.vehicleYear = vehicleYear;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getProfileCompleted() {
        return profileCompleted;
    }

    public void setProfileCompleted(Boolean profileCompleted) {
        this.profileCompleted = profileCompleted;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public AccessRole getAccessRole() {
        return accessRole;
    }

    public String getEmail_password() { return email_password; }

    public void setEmail_password() { this.email_password = email_password; }

}
