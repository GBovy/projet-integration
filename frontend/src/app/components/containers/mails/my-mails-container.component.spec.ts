/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyMailsContainerComponent } from './my-mails-container.component';

describe('MyMailsContainerComponent', () => {
    let component: MyMailsContainerComponent;
    let fixture: ComponentFixture<MyMailsContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyMailsContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyMailsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});