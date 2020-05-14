import { PackInterface } from './interfaces/pack.interface';
import { Ride } from './ride.model';

export class Pack extends PackInterface {

/*
    // public name: string;
    // public description: string;
    public price: number;
    public mass: number;
    public volume: number;
    public pickUpAddress: string;
    public pickUpCity: string;
    public pickUpZipCode: string;
    public pickUpCountry: string;
    public pickUpDate: string;

    constructor(obj) {
        super();
        // this.name = obj.name;
        // this.description = obj.description;
        this.price = obj.price;
        this.mass = obj.mass;
        this.volume = obj.volume;
        this.pickUpAddress = obj.pickUpAddress;
        this.pickUpCity = obj.pickUpCity;
        this.pickUpZipCode = obj.pickUpZipCode;
        this.pickUpCountry = obj.pickUpCountry;
        this.pickUpDate = obj.pickUpDate;
    }
*/
    // public name?: string;
    // public description?: string;
    public price?: number;
    public mass?: number;
    public volume?: number;
    public pickUpAddress?: string;
    public pickUpCity?: string;
    public pickUpZipCode?: string;
    public pickUpCountry?: string;
    public pickUpDate?: string;
    public ride?: Ride;

    constructor(obj: Partial<Pack>) {
        super();
        Object.assign(this, obj);
    }

    public static toDto(obj: Pack) {
        return {
        // this.name = obj.name;
        // this.description = obj.description;
        price : obj.price,
        mass : obj.mass,
        volume : obj.volume,
        pickUpAddress : obj.pickUpAddress,
        pickUpCity : obj.pickUpCity,
        pickUpZipCode : obj.pickUpZipCode,
        pickUpCountry : obj.pickUpCountry,
        pickUpDate : obj.pickUpDate,
        rideID: obj.ride
        };
    }
}
