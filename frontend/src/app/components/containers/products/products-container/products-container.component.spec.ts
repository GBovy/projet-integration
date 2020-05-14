/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductsContainerComponent } from './products-container.component';

describe('ProductsDeliveryContainerComponent', () => {
    let component: ProductsContainerComponent;
    let fixture: ComponentFixture<ProductsContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductsContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
