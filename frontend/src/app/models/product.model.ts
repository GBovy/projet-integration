export class Product {

    // public calculatedDetour: number;
    public deliveryDate: string;
    public destinationAddress: string;
    public destinationCity: string;
    public destinationZipCode: string;
    public destinationCountry: string;
    public maxMass: any;
    public maxVolume: any;
    public price: any;
    public startingAddress: string;
    public startingCity: string;
    public startingZipCode: string;
    public startingCountry: string;
    public totalDistance: any;

    constructor(obj) {
        this.deliveryDate = obj.deliveryDate;
        this.destinationAddress = obj.destinationAddress;
        this.destinationCity = obj.destinationCity;
        this.destinationZipCode = obj.destinationZipCode;
        this.destinationCountry = obj.destinationCountry;
        this.maxMass = obj.maxMass;
        this.maxVolume = obj.maxVolume;
        this.price = obj.price;
        this.startingAddress = obj.startingAddress;
        this.startingCity = obj.startingCity;
        this.startingZipCode = obj.startingZipCode;
        this.startingCountry = obj.startingCountry;
        this.totalDistance = obj.totalDistance;
    }
}
