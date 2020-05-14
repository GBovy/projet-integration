import { RideInterface } from 'src/app/models/interfaces/ride.interface';
import { UserInterface } from 'src/app/models/interfaces/user.interface';
import { OrderStatus } from '../enums/order-status.enum';

export class OrderInterface {
    id?: number;
    uuid?: string;
    mass?: number;
    volume?: number;
    calculatedPrice?: number;
    deliveryAddress?: string;
    deliveryCity?: string;
    deliveryZipCode?: string;
    deliveryCountry?: string;
    comment?: string;
    paid?: boolean; // INUTILE?
    status?: OrderStatus;
    validated?: boolean; // INUTILE SI STATUS VALIDATED
    validationComment?: string;
    validationSecretCode?: string;
    // userUuid?: string;
    ride?: RideInterface;
    // user?: UserInterface;
}
