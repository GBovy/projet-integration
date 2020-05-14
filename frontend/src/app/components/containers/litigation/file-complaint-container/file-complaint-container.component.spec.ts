/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FileComplaintContainerComponent } from './file-complaint-container.component';

describe('FileComplaintContainerComponent', () => {
    let component: FileComplaintContainerComponent;
    let fixture: ComponentFixture<FileComplaintContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FileComplaintContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileComplaintContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
