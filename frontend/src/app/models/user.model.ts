import { UserInterface } from './interfaces/user.interface';
import { UserRole } from './enums/user-role.enum';
import { Country } from './enums/country.enum';
import { VehicleType } from './enums/vehicule-type.enum';

export class User extends UserInterface {

    public lastname: string;
    public firstname: string;
    public email: string;
    public password: string;
    public userRole: UserRole;
    public address: string;
    public city: string;
    public country: Country;
    public zipCode: string;
    public bankingAccount: string;
    // public creditCard: string;
    // public creditCardValidity: string;
    public paypal: string;
    // public greenCard: any;
    // public insuranceDocument: any;
    // public drivingLicence: any;
    public vehicleModel: VehicleType;
    public vehicleYear: number;

    // emailVerified: boolean;
    // imageUrl: string;
    // provider: string;
    // providerId: string;

    constructor(obj) {
        super();
        this.lastname = obj.lastname;
        this.firstname = obj.firstname;
        this.email = obj.email;
        this.password = obj.password;
        this.userRole = obj.userRole;
        this.address = obj.address;
        this.city = obj.city;
        this.country = obj.country;
        this.zipCode = obj.zipCode;
        this.bankingAccount = obj.bankingAccount;
        // this.creditCard = obj.creditCard;
        // this.creditCardValidity = obj.creditCardValidity;
        this.paypal = obj.paypal;
        // this.greenCard = obj.greenCard;
        // this.insuranceDocument = obj.insuranceDocument;
        // this.drivingLicence = obj.drivingLicence;
        this.vehicleModel = obj.vehicleModel;
        this.vehicleYear = obj.vehicleYear;

        // this.emailVerified = obj.emailVerified;
        // this.imageUrl = obj.imageUrl;
        // this.provider = obj.provider;
        // this.providerId = obj.providerId;
    }
}
