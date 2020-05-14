import { Component, OnInit } from '@angular/core';
import { DeliveryType } from 'src/app/models/enums/delivery-type.enum';
import { RideService } from 'src/app/services/ride.service';
import { RideInterface } from './../../../../models/interfaces/ride.interface';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Ride } from 'src/app/models/ride.model';

class FormProperties {
    public static readonly STARTING_CITY = 'startingCity';
    public static readonly ENDING_CITY = 'destinationCity';
}
@Component({
    selector: 'app-products-offer',
    templateUrl: './products-offer.component.html',
    styleUrls: ['./products-offer.component.scss']
})
export class ProductsOfferComponent implements OnInit {

    FormProperties = FormProperties;

    public rides: Ride[] = [];

    public displayedColumns: string[] = [
        'startingCity',
        'destinationCity',
        'maxMass',
        'maxVolume',
        'deliveryManID',
        'orderButton'
    ];

    public isLoadingResults = true;

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private rideService: RideService
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            [FormProperties.STARTING_CITY]: ['', [Validators.maxLength(150)]],
            [FormProperties.ENDING_CITY]: ['', [Validators.maxLength(150)]]
        });
        this.rideService.getRides(DeliveryType.OFFER)
            .subscribe(res => {
                this.rides = res.map(e => Ride.fromDto(e));
                this.isLoadingResults = false;
            });
    }

    public onSubmit(form: any) {
        this.isLoadingResults = true;
        const searchValues = {
            [FormProperties.STARTING_CITY]: this.form.get(FormProperties.STARTING_CITY).value as string,
            [FormProperties.ENDING_CITY]: this.form.get(FormProperties.ENDING_CITY).value as string
        };

        this.rideService.getProductByCity(searchValues, DeliveryType.OFFER)
            .pipe(take(1))
            .subscribe(res => {
                this.rides = res.map(e => Ride.fromDto(e));
                this.isLoadingResults = false;
            });
    }

}
