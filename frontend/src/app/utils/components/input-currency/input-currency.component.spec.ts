import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { InputCurrencyComponent } from './input-currency.component';
import { ngxMaskOptions } from 'src/app/app.module';


@Component({
    template: `
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <duf-input-currency  formControlName="inputCurrencyCtrl"></duf-input-currency>
</form>
`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class MockContainerComponent implements OnInit {
    form = new FormGroup({
        inputCurrencyCtrl: new FormControl()
    });
    constructor() { }

    ngOnInit() { }

    onSubmit() { }
}

describe('InputCurrencyComponent', () => {
    let containerComponent: MockContainerComponent;
    let containerComponentFixture: ComponentFixture<MockContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockContainerComponent,
                InputCurrencyComponent
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                NgxMaskModule.forRoot(ngxMaskOptions)
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        containerComponentFixture = TestBed.createComponent(MockContainerComponent);
        containerComponent = containerComponentFixture.componentInstance;
        containerComponentFixture.detectChanges();
    });

    it('Should test formControl to be valid if nothing is entered (and value be null)', () => {
        expect(containerComponent.form.get('inputCurrencyCtrl').valid).toBe(true);
        expect(containerComponent.form.get('inputCurrencyCtrl').value).toBeNull();
    });

});
