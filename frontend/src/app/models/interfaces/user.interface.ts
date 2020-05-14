import { VehicleType } from './../enums/vehicule-type.enum';
import { UserRole } from '../enums/user-role.enum';
import { Country } from '../enums/country.enum';
export class UserInterface {
    lastname: string;
    firstname: string;
    email: string;
    password?: string;
    userRole?: UserRole;
    address?: string;
    city?: string;
    country?: Country;
    zipCode?: string;
    bankingAccount?: string;
    // creditCard?: string;
    // creditCardValidity?: string;
    paypal?: string;
    // greenCard?: any;
    // insuranceDocument?: any;
    // drivingLicence?: any;
    vehicleModel?: VehicleType;
    vehicleYear?: number;

    email_password?: string;
    emailVerified?: boolean;
    imageUrl?: string;
    provider?: string;
    providerId?: string;
}
