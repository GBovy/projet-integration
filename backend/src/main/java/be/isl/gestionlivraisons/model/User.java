package be.isl.gestionlivraisons.model;

import be.isl.gestionlivraisons.model.enums.AccessRole;
import be.isl.gestionlivraisons.model.enums.AuthProvider;
import be.isl.gestionlivraisons.model.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;

/**
 * @author Pierre-Yves Crutzen
 */

@Entity
@Table(name = "users")
public class User {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", unique = true, nullable = false)
    private Long id;

    @Column(name = "uuid")
    private UUID uuid;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<UploadedFile> uploadedFiles;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Ride> rides;

    @Column(name = "last_name", length = 150)
    private String lastname;

    @Column(name = "first_name", length = 150)
    private String firstname;

    @Email
    @Column(name = "email", unique = true, nullable = false, length = 150)
    private String email;

    @Column(name = "password", length = 150)
//    @JsonIgnore
    private String password;

    @Column(name = "address")
    private String address;

    @Column(name = "city", length = 150)
    private String city;

    @Column(name = "zip_code", length = 20)
    private String zipCode;

    @Column(name = "country")
    private String country;

    @Column(name = "banking_account", length = 50)
    private String bankingAccount;

//    @Column(name = "credit_card", length = 50)
//    private String creditCard;
//
//    @Column(name = "credit_card_validity", length = 6)
//    private String creditCardValidity;

    @Column(name = "paypal")
    private String paypal;

    @Column(name = "vehicle_model")
    private String vehicleModel;

    @Column(name = "vehicle_year")
    private String vehicleYear;

    @Column(name = "image_url", length = 512)
    private String imageUrl;

    @Column(nullable = false, name = "profile_completed")
    private Boolean profileCompleted = false;

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @Column(name = "access_role", nullable = false)
    private AccessRole accessRole;

    @Column(name = "user_role", nullable = false)
    private UserRole userRole;

    @Column(name = "email_password", nullable = true)
    private String email_password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getEmail_password() {
        return email_password;
    }

    public void setEmail_password(String email_password)  { this.email_password = email_password;}

    @JsonIgnore
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

//    public String getCreditCard() {
//        return creditCard;
//    }
//
//    public void setCreditCard(String creditCard) {
//        this.creditCard = creditCard;
//    }
//
//    public String getCreditCardValidity() {
//        return creditCardValidity;
//    }
//
//    public void setCreditCardValidity(String creditCardValidity) {
//        this.creditCardValidity = creditCardValidity;
//    }

    public String getPaypal() {
        return paypal;
    }

    public void setPaypal(String paypal) {
        this.paypal = paypal;
    }

    public Set<UploadedFile> getUploadedFiles() {
        return uploadedFiles;
    }

    public void setUploadedFiles(Set<UploadedFile> uploadedFiles) {
        this.uploadedFiles.removeAll(this.uploadedFiles);
        this.uploadedFiles.addAll(uploadedFiles);
    }

    public Set<Ride> getRides() {
        return rides;
    }

    public void setRides(Set<Ride> rides) {
        this.rides = rides;
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

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }
    
    public Boolean getProfileCompleted() {
        return profileCompleted;
    }

    public void setProfileCompleted(Boolean profileCompleted) {
        this.profileCompleted = profileCompleted;
    }

    public AccessRole getAccessRole() {
        return accessRole;
    }

    public void setAccessRole(AccessRole accessRole) {
        this.accessRole = accessRole;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

}
