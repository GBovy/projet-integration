import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-products-container',
    templateUrl: './products-container.component.html',
    styleUrls: ['./products-container.component.scss']
})
export class ProductsContainerComponent {

    public navLinks = [
        { path: '/products/delivery', label: 'COMPONENTS.NAVIGATION.PRODUCTS_DELIVERY' },
        { path: '/products/offers', label: 'COMPONENTS.NAVIGATION.PRODUCTS_OFFERS' }
    ];

    constructor() { }

}
