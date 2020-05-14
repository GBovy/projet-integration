import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment-es6';
import { BehaviorSubject } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { CalculationInterface } from 'src/app/models/interfaces/calculation.interface';
import { RideInterface } from 'src/app/models/interfaces/ride.interface';
import { Pack } from 'src/app/models/pack.model';
import { RideService } from 'src/app/services/ride.service';
import { CustomControlValidators } from 'src/app/utils/custom-control-validators/custom-control-validators';
import { MapsUtils } from 'src/app/utils/helpers/maps.utils';
import { OrderInterface } from '../../../../../models/interfaces/order.interface';
import { OrderService } from '../../../../../services/order.service';
import { Order } from './../../../../../models/order.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { TokenResult, Token } from 'ngx-stripe';
import { Ride } from 'src/app/models/ride.model';

class DeliveryAddressProperties {
    public static readonly ADDRESS = 'deliveryAddress';
    public static readonly CITY = 'deliveryCity';
    public static readonly ZIP_CODE = 'deliveryZipCode';
    public static readonly COUNTRY = 'deliveryCountry';
}
class PickUpAddressProperties {
    public static readonly DATE = 'pickUpDate';
    public static readonly ADDRESS = 'pickUpAddress';
    public static readonly CITY = 'pickUpCity';
    public static readonly ZIP_CODE = 'pickUpZipCode';
    public static readonly COUNTRY = 'pickUpCountry';
}
class OrderProperties {
    public static readonly PACKAGE_VOLUME = 'volume';
    public static readonly PACKAGE_MASS = 'mass';
    public static readonly DURATION = 'duration';
    public static readonly DISTANCE = 'distance';
    public static readonly COMMENT = 'comment';
}
@Component({
    selector: 'app-order-delivery',
    templateUrl: './order-delivery.component.html',
    styleUrls: ['./order-delivery.component.scss']
})
export class OrderDeliveryComponent implements OnInit {

    // Properties
    PickUpAddressProperties = PickUpAddressProperties;
    DeliveryAddressProperties = DeliveryAddressProperties;
    OrderProperties = OrderProperties;

    public form: FormGroup;
    public previewed$ = new BehaviorSubject<boolean>(false);

    public startingAddress: string;
    public endingAddress: string;
    public calculated: CalculationInterface;

    public ride: Ride;

    constructor(
        private activatedRoute: ActivatedRoute,
        private rideService: RideService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private router: Router,
        private orderService: OrderService
    ) { }

    ngOnInit() {
        // Listening the ride id through the route and calling the ride by id.
        this.fetchRide(this.activatedRoute.snapshot.params.id);
    }

    /**
     * Fetching a ride by id
     * @param rideId number value from the route
     */
    private fetchRide(rideId: number): void {
        this.rideService.getRideById(rideId)
            .pipe(take(1))
            .subscribe((response: RideInterface) => {
                this.constructForm(response);
                this.ride = Ride.fromDto(response);
            });
    }

    /**
     * To verify if the formControl is valid
     */
    public isInvalidControl(formControlName: string): boolean {
        return (this.form.get(formControlName).value && this.form.get(formControlName).touched && this.form.get(formControlName).invalid);
    }

    /**
     * Button to preview the itinerary
     */
    public preview() {
        if (!this.previewed$.getValue()) {
            this.startingAddress = MapsUtils.formatAddressQuery(this.form, PickUpAddressProperties);
            this.endingAddress = MapsUtils.formatAddressQuery(this.form, DeliveryAddressProperties);
            this.previewed$.next(true);
        }
    }

    /**
     * Button to reload the view to be able to make a new itinerary.
     */
    public refresh() {
        if (this.previewed$.getValue()) {
            window.document.location.reload();
        }
    }

    /**
     * On submitting the form (order action)
     */
    public onSubmit() {
        if (this.previewed$.getValue() && this.form.valid) {
            this.openDialog();
        }
    }

    /**
     * Opening modal with initial data
     */
    private openDialog(): void {
        // On opening modal
        const dialogRef = this.dialog.open(OrderModalComponent, {
            width: '550px', height: '270px', // modal size
            data: { amount: this.ride.price } // inital data
        });

        // After closing modal
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) { // equals false in case of cancel action
                this.orderRide(result); // Ordering the ride if token result
            }
        });
    }

    /**
     * On order token response, it calls ws to order the ride
     * @param modalResults results from the paying modal
     */
    private orderRide(stripeToken: any) {
        const order = {
            calculatedPrice: this.ride.price,
            [OrderProperties.DISTANCE]: this.form.controls[OrderProperties.DISTANCE].value,
            [OrderProperties.DURATION]: this.form.controls[OrderProperties.DURATION].value,
            [DeliveryAddressProperties.ADDRESS]: this.form.controls[DeliveryAddressProperties.ADDRESS].value,
            [DeliveryAddressProperties.CITY]: this.form.controls[DeliveryAddressProperties.CITY].value,
            [DeliveryAddressProperties.ZIP_CODE]: this.form.controls[DeliveryAddressProperties.ZIP_CODE].value,
            [DeliveryAddressProperties.COUNTRY]: this.form.controls[DeliveryAddressProperties.COUNTRY].value,
            [OrderProperties.COMMENT]: this.form.controls[OrderProperties.COMMENT].value
        } as OrderInterface;
        const pack = new Pack({
            [OrderProperties.PACKAGE_MASS]: this.form.controls[OrderProperties.PACKAGE_MASS].value,
            [OrderProperties.PACKAGE_VOLUME]: this.form.controls[OrderProperties.PACKAGE_VOLUME].value,
            [PickUpAddressProperties.ADDRESS]: this.form.controls[PickUpAddressProperties.ADDRESS].value,
            [PickUpAddressProperties.CITY]: this.form.controls[PickUpAddressProperties.CITY].value,
            [PickUpAddressProperties.ZIP_CODE]: this.form.controls[PickUpAddressProperties.ZIP_CODE].value,
            [PickUpAddressProperties.COUNTRY]: this.form.controls[PickUpAddressProperties.COUNTRY].value,
            [PickUpAddressProperties.DATE]: this.form.controls[PickUpAddressProperties.DATE].value
        });
        this.orderService.postOrderProduct(this.ride.id, order, pack, stripeToken.token.id)
            .pipe(take(1))
            .subscribe((res) => {
                if (res) {
                    this.router.navigate(['/my-products/orders']);
                    //         // TODO: COMMANDER EN LIGNE
                    //         // TODO: rediriger vers la page "mes commandes"
                }
            });
    }

    /**
         * Listen changes from ride
         */
    public rideChange(ride: { distance: number, duration: number }): void {
        this.form.get(OrderProperties.DURATION).setValue(ride.duration);
        this.form.get(OrderProperties.DISTANCE).setValue(ride.duration);
        // this.rideInfo = ride;
        this.calculateRide();

        // Appel service pour mettre à jour les données de prix calculé
        // this.rideService.calculateOrder({
        //     volume: this.form.get(OrderProperties.PACKAGE_VOLUME).value,
        //     mass: this.form.get(OrderProperties.PACKAGE_MASS).value
        // }).subscribe((response: CalculationInterface) => {
        //     this.calculated = {
        //         price: (+response.price).toFixed(2) + ' €'
        //     };
        // });
    }

    private calculateRide() {
        // Appel service pour mettre à jour les données de prix calculé
        this.rideService.calculateRide({
            distance: this.form.get(OrderProperties.DISTANCE).value,
            price: 0,
            volume: this.form.get(OrderProperties.PACKAGE_VOLUME).value,
            mass: this.form.get(OrderProperties.PACKAGE_MASS).value
        }).pipe(take(1)).subscribe((response: CalculationInterface) => {
            this.calculated = {
                // price: (+response.price).toFixed(2) + ' €',
                // rideCost: (+response.rideCost).toFixed(2) + ' €',
                // commission: (+response.commission).toFixed(2) + ' €',
                // totalGain: (+response.totalGain).toFixed(2) + ' €',
                // minimumPrice: +response.minimumPrice,
                // maximumPrice: +response.maximumPrice
            };
            this.ride.price = response.price;
            // // // Updating validators
            // this.form.get(DeliveryProperties.PRICE).setValidators([
            //     Validators.required, Validators.min(this.calculated.minimumPrice), Validators.max(this.calculated.maximumPrice)
            // ]);
            // this.form.updateValueAndValidity();
            console.log('calculated', this.calculated);
            console.log('valid : ', this.form.valid); // TODO: valid doit etre false
        });
    }

    private constructForm(ride: RideInterface) {
        this.form = this.fb.group({
            [PickUpAddressProperties.DATE]: ['', [
                Validators.required, CustomControlValidators.dateFormat,
                CustomControlValidators.rangeDateValidator(moment(ride.deliveryDate).toDate())
            ]],
            [PickUpAddressProperties.ADDRESS]: ['', [Validators.required]],
            [PickUpAddressProperties.CITY]: ['', [Validators.required, Validators.maxLength(150)]],
            [PickUpAddressProperties.ZIP_CODE]: ['', [Validators.required, Validators.maxLength(20)]],
            [PickUpAddressProperties.COUNTRY]: [null, [Validators.required]],
            [DeliveryAddressProperties.ADDRESS]: ['', [Validators.required]],
            [DeliveryAddressProperties.CITY]: ['', [Validators.required, Validators.maxLength(150)]],
            [DeliveryAddressProperties.ZIP_CODE]: ['', [Validators.required, Validators.maxLength(20)]],
            [DeliveryAddressProperties.COUNTRY]: [null, [Validators.required]],
            [OrderProperties.PACKAGE_VOLUME]: ['', [
                Validators.required, CustomControlValidators.numbers, Validators.max(ride.maxVolume), Validators.maxLength(10)
            ]],
            [OrderProperties.PACKAGE_MASS]: ['', [
                Validators.required, CustomControlValidators.numbers, Validators.max(ride.maxMass), Validators.maxLength(10)
            ]],
            // [OrderProperties.RIDE_DATE]: ['', [Validators.required, CustomControlValidators.dateFormat]], // in order-offer component
            [OrderProperties.COMMENT]: ['', [Validators.maxLength(500)]],
            [OrderProperties.DISTANCE]: [0, [CustomControlValidators.numbers, Validators.max(ride.maximumDistance)]],
            [OrderProperties.DURATION]: [0, [CustomControlValidators.numbers]]
        });
    }

}
// Récupérer les infos du trajet : distance,
// prix calculé à additionner au prix du détour,

// distance totale avec le détour compris
// ne pas dépasser la distance totale du ratio demandé par le systeme
// Ne pas permettre de dépasser un détour supérieur à une distance de 1/5 du trajet.

// création manuelle => doit etre aujourd'hui au minimum
// ne pas dépasser la masse max et le volume max (validation back)
// date du retrait doit être avant ou égale avec la date du trajet (validation back)
