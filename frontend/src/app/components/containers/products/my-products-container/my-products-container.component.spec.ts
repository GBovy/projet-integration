/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyProductsContainerComponent } from './my-products-container.component';

describe('ProductsDeliveryContainerComponent', () => {
    let component: MyProductsContainerComponent;
    let fixture: ComponentFixture<MyProductsContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyProductsContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyProductsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
