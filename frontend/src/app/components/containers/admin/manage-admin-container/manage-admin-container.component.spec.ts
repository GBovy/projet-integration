/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageAdminContainerComponent } from './manage-admin-container.component';

describe('ManageAdminContainerComponent', () => {
    let component: ManageAdminContainerComponent;
    let fixture: ComponentFixture<ManageAdminContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ManageAdminContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageAdminContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
