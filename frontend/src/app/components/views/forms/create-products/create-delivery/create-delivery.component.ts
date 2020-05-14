import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DeliveryType } from 'src/app/models/enums/delivery-type.enum';
import { Ride } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';
import { CustomControlValidators } from 'src/app/utils/custom-control-validators/custom-control-validators';
import { CalculationInterface } from 'src/app/models/interfaces/calculation.interface';
import { MapsUtils } from 'src/app/utils/helpers/maps.utils';
import { take } from 'rxjs/operators';
import moment from 'moment-es6';

class StartAddressProperties {
    public static readonly ADDRESS = 'startingAddress';
    public static readonly CITY = 'startingCity';
    public static readonly ZIP_CODE = 'startingZipCode';
    public static readonly COUNTRY = 'startingCountry';
}
class EndAddressProperties {
    public static readonly ADDRESS = 'destinationAddress';
    public static readonly CITY = 'destinationCity';
    public static readonly ZIP_CODE = 'destinationZipCode';
    public static readonly COUNTRY = 'destinationCountry';
}
class DeliveryProperties {
    public static readonly DELIVERY_DATE = 'deliveryDate';
    public static readonly MAX_VOLUME = 'maxVolume';
    public static readonly MAX_MASS = 'maxMass';
    public static readonly PRICE = 'price';
    public static readonly DISTANCE = 'distance';
    public static readonly DURATION = 'duration';
    public static readonly COMMENT = 'comment';
}
@Component({
    selector: 'app-create-delivery',
    templateUrl: './create-delivery.component.html',
    styleUrls: ['./create-delivery.component.scss']
})
export class CreateDeliveryComponent {

    // Properties
    StartAddressProperties = StartAddressProperties;
    EndAddressProperties = EndAddressProperties;
    DeliveryProperties = DeliveryProperties;

    public form: FormGroup;
    public previewed$ = new BehaviorSubject<boolean>(false);
    public calculate$ = new BehaviorSubject<boolean>(false);

    public startingAddress: string;
    public endingAddress: string;
    public calculated: CalculationInterface;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private rideService: RideService
    ) {
        this.constructForm();
    }

    /**
     * Button preview action
     */
    public preview() {
        if (!this.previewed$.getValue()) {
            this.startingAddress = MapsUtils.formatAddressQuery(this.form, StartAddressProperties);
            this.endingAddress = MapsUtils.formatAddressQuery(this.form, EndAddressProperties);
            this.previewed$.next(true);
        }
    }

    /**
     * Button event action
     */
    public refresh() {
        if (this.previewed$.getValue()) {
            window.document.location.reload();
        }
    }

    public calculate() {
        if (this.previewed$.getValue()) {

            // // Appel service pour mettre à jour les données de prix calculé
            // console.log('calculated', this.calculated);
            // // Updating validators
            // this.form.get(DeliveryProperties.PRICE).setValidators([
            //     Validators.required, Validators.min(+this.calculated.minimumPrice), Validators.max(+this.calculated.maximumPrice)
            // ]);
            this.calculateRide();
        }
    }

    private calculateRide() {
        // Appel service pour mettre à jour les données de prix calculé
        this.rideService.calculateRide({
                distance: this.form.get(DeliveryProperties.DISTANCE).value,
                price: this.form.get(DeliveryProperties.PRICE).value,
                volume: this.form.get(DeliveryProperties.MAX_VOLUME).value,
                mass: this.form.get(DeliveryProperties.MAX_MASS).value
            })
            .pipe(take(1))
            .subscribe((response: CalculationInterface) => {
                this.calculated = {
                    price: +response.price.toFixed(2),
                    rideCost: (+response.rideCost).toFixed(2),
                    commission: (+response.commission).toFixed(2),
                    totalGain: (+response.totalGain).toFixed(2),
                    minimumPrice: +response.minimumPrice,
                    maximumPrice: +response.maximumPrice,
                    maximumDistance: +response.maximumDistance
                };
                // // // Updating validators
                // this.form.get(DeliveryProperties.PRICE).setValidators([
                //     Validators.required, Validators.min(this.calculated.minimumPrice), Validators.max(this.calculated.maximumPrice)
                // ]);
                // this.form.updateValueAndValidity();
                console.log('calculated', this.calculated);
                console.log('valid : ', this.form.valid); // TODO: valid doit etre false
            });
    }

    /**
     * Button submit action
     */
    public onSubmit() {
        if (this.previewed$.getValue() && this.form.valid) {

            const deliveryRide = new Ride({
                startingAddress: this.form.controls[StartAddressProperties.ADDRESS].value,
                startingCity: this.form.controls[StartAddressProperties.CITY].value,
                startingZipCode: this.form.controls[StartAddressProperties.ZIP_CODE].value,
                startingCountry: this.form.controls[StartAddressProperties.COUNTRY].value,
                deliveryDate: this.form.controls[DeliveryProperties.DELIVERY_DATE].value,
                destinationAddress: this.form.controls[EndAddressProperties.ADDRESS].value,
                destinationCity: this.form.controls[EndAddressProperties.CITY].value,
                destinationZipCode: this.form.controls[EndAddressProperties.ZIP_CODE].value,
                destinationCountry: this.form.controls[EndAddressProperties.CITY].value,
                maxMass: this.form.controls[DeliveryProperties.MAX_MASS].value,
                maxVolume: this.form.controls[DeliveryProperties.MAX_VOLUME].value,
                price: this.calculated.price,
                distance: this.form.controls[DeliveryProperties.DISTANCE].value,
                duration: this.form.controls[DeliveryProperties.DURATION].value,
                deliveryType: DeliveryType.DELIVERY,
                maximumDistance: this.calculated.maximumDistance
            });

            // Appel service pour créer le rôle
            this.rideService.createRide(Ride.toDto(deliveryRide))
                .pipe(take(1))
                .subscribe(() => {
                    this.router.navigate(['/my-products/delivery']);
                });

        }

    }

    /**
     * Listen changes from ride
     */
    public rideChange(ride: { distance: number, duration: number }): void {
        this.form.get(DeliveryProperties.DISTANCE).setValue(ride.distance);
        this.form.get(DeliveryProperties.DURATION).setValue(ride.duration);

        // Appel service pour mettre à jour les données de prix calculé
        this.calculateRide();
    }

    /**
     * Checks if a formcontrol is invalid
     * @param formControlName formControlPrperty name
     * @returns if control is valid
     */
    public isInvalidControl(formControlName: string): boolean {
        return (this.form.get(formControlName).value && this.form.get(formControlName).touched && this.form.get(formControlName).invalid);
    }

    /**
     * Creates the form
     */
    private constructForm() {
        this.form = this.fb.group({
            [StartAddressProperties.ADDRESS]: ['', [Validators.required]],
            [StartAddressProperties.CITY]: ['', [Validators.required, Validators.maxLength(150)]],
            [StartAddressProperties.ZIP_CODE]: ['', [Validators.required, Validators.maxLength(20)]],
            [StartAddressProperties.COUNTRY]: [null, [Validators.required]],

            [EndAddressProperties.ADDRESS]: ['', [Validators.required]],
            [EndAddressProperties.CITY]: ['', [Validators.required, Validators.maxLength(150)]],
            [EndAddressProperties.ZIP_CODE]: ['', [Validators.required, Validators.maxLength(20)]],
            [EndAddressProperties.COUNTRY]: [null, [Validators.required]],

            [DeliveryProperties.MAX_VOLUME]: ['', [CustomControlValidators.numbers, Validators.required, Validators.maxLength(10)]],
            [DeliveryProperties.MAX_MASS]: ['', [CustomControlValidators.numbers, Validators.required, Validators.maxLength(10)]],
            [DeliveryProperties.DELIVERY_DATE]: ['', [
                Validators.required, CustomControlValidators.dateFormat, CustomControlValidators.rangeDateValidator(moment().toDate())
            ]],
            [DeliveryProperties.PRICE]: ['', [CustomControlValidators.numbers, Validators.required]],
            [DeliveryProperties.DISTANCE]: [0, [CustomControlValidators.numbers]],
            [DeliveryProperties.DURATION]: [0, [CustomControlValidators.numbers]],
            [DeliveryProperties.COMMENT]: ['', [Validators.maxLength(500)]]
        });
    }

}
