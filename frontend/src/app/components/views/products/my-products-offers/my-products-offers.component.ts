import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { DeliveryType } from 'src/app/models/enums/delivery-type.enum';
import { Ride } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-my-products-offers',
  templateUrl: './my-products-offers.component.html',
  styleUrls: ['./my-products-offers.component.scss']
})
export class MyProductsOffersComponent implements OnInit {

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
        this.rideService.getMyRides(DeliveryType.OFFER)
            .pipe(take(1))
            .subscribe(res => {
                this.rides = res.map(e => Ride.fromDto(e));
                this.isLoadingResults = false;
            });
    }

}
