import { OrderStatus } from './enums/order-status.enum';
import { OrderInterface } from './interfaces/order.interface';
import { Ride } from './ride.model';

export class Order {

    public id?: number; 
    public uuid?: string;
    public mass?: number;
    public volume?: number;
    public calculatedPrice?: number;
    public deliveryAddress?: string;
    public deliveryCity?: string;
    public deliveryZipCode?: string;
    public deliveryCountry?: string;
    public comment?: string;
    public paid?: boolean; // INUTILE
    public status?: OrderStatus;
    public validated?: boolean; // INUTILE SI STATUS VALIDATED
    public validationComment?: string;
    public validationSecretCode?: string;
    // public userUuid?: string;
    public ride?: Ride;

    constructor(obj?: Partial<Order>) {
        Object.assign(this, obj);
    }

    public static fromDto(dto: OrderInterface) {
        const obj = new Order();
        Object.assign(obj, {
            id: dto.id,
            uuid: dto.uuid,
            mass: (dto.mass / 100).toFixed(2),
            volume: (dto.volume / 100).toFixed(2),
            calculatedPrice: dto.calculatedPrice,
            deliveryAddress: dto.deliveryAddress,
            deliveryCity: dto.deliveryCity,
            deliveryZipCode: dto.deliveryZipCode,
            deliveryCountry: dto.deliveryCountry,
            comment: dto.comment,
            paid: dto.paid,
            status: dto.status,
            validated: dto.validated,
            validationComment: dto.validationComment,
            validationSecretCode: dto.validationSecretCode,
            // userUuid: obj.userUuid,
            ride: dto.ride ? Ride.fromDto(dto.ride) : null
        });
        return obj;
    }

}
