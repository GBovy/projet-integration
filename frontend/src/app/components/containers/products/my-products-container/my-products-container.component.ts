import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-my-products-container',
    templateUrl: './my-products-container.component.html',
    styleUrls: ['./my-products-container.component.scss']
})
export class MyProductsContainerComponent {

    public navLinks = [
        { path: '/my-products/delivery', label: 'COMPONENTS.NAVIGATION.PRODUCTS_DELIVERY' },
        { path: '/my-products/offers', label: 'COMPONENTS.NAVIGATION.PRODUCTS_OFFERS' },
        { path: '/my-products/orders', label: 'COMPONENTS.NAVIGATION.PRODUCTS_ORDERS' }
    ];

    constructor() { }

}
