import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Order } from 'src/app/models/order.model';
import { OrderService } from './../../../../services/order.service';

class FormProperties {
    public static readonly ORDER_ID = 'id';
}

@Component({
  selector: 'app-my-products-orders',
  templateUrl: './my-products-orders.component.html',
  styleUrls: ['./my-products-orders.component.scss']
})
export class MyProductsOrdersComponent implements OnInit {

    public orders: Order[] = [];

    public displayedColumns: string[] = [
        'orderUuid',
        'deliveryCity',
        'mass',
        'volume',
        'price',
        'deliveryManID',
        'orderButton'
    ];

    public isLoadingResults = true;

    public form: FormGroup;

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        this.orderService.getMyOrders()
            .pipe(take(1))
            .subscribe(res => {
                this.orders = res.map(e => Order.fromDto(e));
                this.isLoadingResults = false;
            });
    }

    //delete//
    public delete(uuid : String) {
        
        this.orderService.delete(uuid)
            .pipe(take(1))
            .subscribe
            (res => 
                    {
                        this.orders = res.map(e => Order.fromDto(e));
                        this.isLoadingResults = false;
                    }
            );
            this.ngOnInit();
    }

}