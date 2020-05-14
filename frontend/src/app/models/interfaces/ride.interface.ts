import { UserInterface } from './user.interface';
import { DeliveryType } from '../enums/delivery-type.enum';

export interface RideInterface {
    id?: string;
    calculatedDetour?: number;
    deliveryDate?: string;
    destinationAddress?: string;
    destinationCity?: string;
    destinationZipCode?: string;
    destinationCountry?: string;
    maxMass?: number;
    maxVolume?: number;
    maximumDistance?: number;
    price?: number;
    startingAddress?: string;
    startingCity?: string;
    startingZipCode?: string;
    startingCountry?: string;
    distance?: number;
    duraton?: number;
    deliveryType?: DeliveryType;
    user?: UserInterface;
    userUuid?: string;
}
