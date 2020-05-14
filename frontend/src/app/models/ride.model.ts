import { RideInterface } from './interfaces/ride.interface';
import { DeliveryType } from './enums/delivery-type.enum';
import { User } from './user.model';

export class Ride {

    public id?: string;
    public calculatedDetour?: number;
    public deliveryDate?: string;
    public destinationAddress?: string;
    public destinationCity?: string;
    public destinationZipCode?: string;
    public destinationCountry?: string;
    public maxMass?: string;
    public maxVolume?: string;
    public price?: number;
    public startingAddress?: string;
    public startingCity?: string;
    public startingZipCode?: string;
    public startingCountry?: string;
    public distance?: number;
    public duration?: number;
    public deliveryType?: DeliveryType;
    public maximumDistance?: number;
    public userUuid?: string;

    constructor(obj?: Partial<Ride>) {
        Object.assign(this, obj);
    }

    public static toDto(obj: Ride) {
        return {
            startingAddress: obj.startingAddress,
            startingCity: obj.startingCity,
            startingZipCode: obj.startingZipCode,
            startingCountry: obj.startingCountry,
            deliveryDate: obj.deliveryDate,
            destinationAddress: obj.destinationAddress,
            destinationCity: obj.destinationCity,
            destinationZipCode: obj.destinationZipCode,
            destinationCountry: obj.destinationCountry,
            maxMass: obj.maxMass,
            maxVolume: obj.maxVolume,
            price: obj.price,
            distance: obj.distance.toString(),
            duration: obj.duration.toString(),
            deliveryType: obj.deliveryType,
            maximumDistance: obj.maximumDistance
        };
    }

    public static fromDto(dto: RideInterface) {
        const obj = new Ride();
        Object.assign(obj, {
            id: dto.id,
            calculatedDetour: dto.calculatedDetour,
            deliveryDate: dto.deliveryDate,
            destinationAddress: dto.destinationAddress,
            destinationCity: dto.destinationCity,
            destinationZipCode: dto.destinationZipCode,
            destinationCountry: dto.destinationCountry,
            price: dto.price,
            maxMass: (dto.maxMass / 100).toFixed(2),
            maxVolume: (dto.maxVolume / 100).toFixed(2),
            maximumDistance: dto.maximumDistance,
            startingAddress: dto.startingAddress,
            startingCity: dto.startingCity,
            startingZipCode: dto.destinationZipCode,
            startingCountry: dto.startingCountry,
            distance: dto.distance,
            duraton: dto.duraton,
            deliveryType: dto.deliveryType,
            userUuid: dto.userUuid
            // user: User.fromDto(dto.user)
        });
        return obj;
    }
}
