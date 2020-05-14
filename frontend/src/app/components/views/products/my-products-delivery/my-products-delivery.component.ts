import { Component, OnInit } from '@angular/core';
import { DeliveryType } from 'src/app/models/enums/delivery-type.enum';
import { RideInterface } from 'src/app/models/interfaces/ride.interface';
import { RideService } from 'src/app/services/ride.service';
import { take } from 'rxjs/operators';
import { Ride } from 'src/app/models/ride.model';

@Component({
  selector: 'app-my-products-delivery',
  templateUrl: './my-products-delivery.component.html',
  styleUrls: ['./my-products-delivery.component.scss']
})
export class MyProductsDeliveryComponent implements OnInit {

    public rides: Ride[] = [];

    public displayedColumns: string[] = [
        'startingCity',
        'destinationCity',
        'destinationAddress',
        'maxMass',
        'maxVolume',
        'deliveryManID',
        'orderButton'
    ];

    public isLoadingResults = true;

    constructor(private rideService: RideService) { }

    ngOnInit() {
        this.rideService.getMyRides(DeliveryType.DELIVERY)
            .pipe(take(1))
            .subscribe(res => {
                this.rides = res.map(e => Ride.fromDto(e));
                this.isLoadingResults = false;
            });
    }

}
