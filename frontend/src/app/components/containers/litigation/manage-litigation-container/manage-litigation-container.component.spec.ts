/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageLitigationContainerComponent } from './manage-litigation-container.component';

describe('ManageLitigationContainerComponent', () => {
    let component: ManageLitigationContainerComponent;
    let fixture: ComponentFixture<ManageLitigationContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ManageLitigationContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageLitigationContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
