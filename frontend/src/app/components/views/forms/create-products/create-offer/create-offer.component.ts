import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DeliveryType } from 'src/app/models/enums/delivery-type.enum';
import { Pack } from 'src/app/models/pack.model';
import { Ride } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';
import { CustomControlValidators } from 'src/app/utils/custom-control-validators/custom-control-validators';
import { CalculationInterface } from 'src/app/models/interfaces/calculation.interface';

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
class OfferProperties {
  public static readonly STARTER_DATE = 'starterDate';
  public static readonly DELIVERY_DATE = 'deliveryDate';
  public static readonly VOLUME = 'volume';
  public static readonly MASS = 'mass';
  public static readonly PRICE = 'price';
  public static readonly DISTANCE = 'distance';
  //public static readonly DURATION = 'duration';
  public static readonly COMMENT = 'comment';
}

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent {

  public form: FormGroup;
  public previewed$ = new BehaviorSubject<boolean>(false);
  public calculate$ = new BehaviorSubject<boolean>(false);

  public startingAddress: string;
  public endingAddress: string;
  public calculated: CalculationInterface;

  StartAddressProperties = StartAddressProperties;
  EndAddressProperties = EndAddressProperties;
  OfferProperties = OfferProperties;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rideService: RideService
    ) {
    this.constructForm();
  }

  public isInvalidControl(formControlName: string): boolean {
    return (this.form.get(formControlName).value && this.form.get(formControlName).touched && this.form.get(formControlName).invalid);
  }

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

        [OfferProperties.VOLUME]: ['', [Validators.required, Validators.maxLength(10)]],
        [OfferProperties.MASS]: ['', [Validators.required, Validators.maxLength(10)]],
        [OfferProperties.DELIVERY_DATE]: ['', [Validators.required, CustomControlValidators.dateFormat]],
        
        [OfferProperties.DISTANCE]: [0, []],
        [OfferProperties.COMMENT]: ['', []]
    });
  }

  public refresh() {
    window.document.location.reload();
  }

  public preview() {
    this.startingAddress = this.formatAddressQuery(StartAddressProperties);
    this.endingAddress = this.formatAddressQuery(EndAddressProperties);
    this.previewed$.next(true);
  }

  private formatAddressQuery(addressPropertyName: any): string {
    return this.createMarkerQuery(
        (this.form.controls[addressPropertyName.ADDRESS].value.replace(/\s/g, '+') + ',+'
            + this.form.controls[addressPropertyName.CITY].value.replace(/\s/g, '+') + ',+'
            + this.form.controls[addressPropertyName.ZIP_CODE].value.replace(/\s/g, '+') + ',+'
            + this.form.controls[addressPropertyName.COUNTRY].value.replace(/\s/g, '+'))
    );
  }  
  
  public calculate() {
    
    if (this.previewed$.getValue() && this.form.valid) {

        // Appel service pour mettre à jour les données de prix calculé
        this.rideService.calculateRide({
            distance: this.form.get(OfferProperties.DISTANCE).value,
            
            price: 0,
            volume: this.form.get(OfferProperties.VOLUME).value,
            mass: this.form.get(OfferProperties.MASS).value
        }).subscribe((response: CalculationInterface) => {
            this.calculated = {
                price: 0,
                rideCost: (+response.rideCost).toFixed(2) + ' €',
                commission: (+response.commission).toFixed(2) + ' €',
                totalGain: (+response.totalGain).toFixed(2) + ' €'
            };
        });
    }
    
  }

  public rideChange(ride: { distance: number}): void {
    this.form.get(OfferProperties.DISTANCE).setValue(ride.distance);
    
    // Appel service pour mettre à jour les données de prix calculé
    this.calculate();
}

  public onSubmit() {
    if (this.previewed$.getValue() && this.form.valid) {
        const deliveryRide = new Ride({
          deliveryDate: this.form.controls[OfferProperties.DELIVERY_DATE].value,
          destinationAddress: this.form.controls[EndAddressProperties.ADDRESS].value,
          destinationCity: this.form.controls[EndAddressProperties.CITY].value,
          destinationZipCode: this.form.controls[EndAddressProperties.ZIP_CODE].value,
          destinationCountry: this.form.controls[EndAddressProperties.CITY].value,
          distance: this.form.controls[OfferProperties.DISTANCE].value,
          deliveryType: DeliveryType.OFFER
        });
        
        const deliveryPack = new Pack({
            price: 0,
            mass: this.form.controls[OfferProperties.MASS].value,
            volume: this.form.controls[OfferProperties.VOLUME].value,
            pickUpAddress: this.form.controls[StartAddressProperties.ADDRESS].value,
            pickUpCity: this.form.controls[StartAddressProperties.CITY].value,
            pickUpZipCode: this.form.controls[StartAddressProperties.ZIP_CODE].value,
            pickUpCountry: this.form.controls[StartAddressProperties.COUNTRY].value,
            pickUpDate: this.form.controls[OfferProperties.STARTER_DATE].value,
            ride: deliveryRide
        });
            
        this.rideService.createPack(Pack.toDto(deliveryPack))
            .subscribe(() => {
                this.router.navigate(['/my-products/offers']); // TODO: rediriger vers la page "mes produits de livraisons"
            }
        );
    }

  }
  
  private createMarkerQuery(addressToQuery: string): string {
    return ('https://nominatim.openstreetmap.org/search?q=' + addressToQuery + '&format=jsonv2&polygon=1&addressdetails=1');
  }

}
