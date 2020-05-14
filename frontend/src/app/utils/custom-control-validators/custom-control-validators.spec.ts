import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomControlValidators } from './custom-control-validators';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div>
                <input type="text" formControlName="control0" />
                <input type="text" formControlName="control1" />
            </div>
        </form>
    `
})
class MockComponent {

    public form: FormGroup;
    public formbuilder: FormBuilder;

    constructor(private fb: FormBuilder) {
        this.formbuilder = fb;
    }

    onSubmit() { }

}

describe('CustomControlValidatorsComponent', () => {

    describe('numbers format test', () => {
        const validCases = [
            '0000',
            '99',
            '88'
        ];

        validCases.forEach((elem, index) => {
            it(
                'should success control number format index : ' + index,
                () => {
                    const control = new FormControl(elem);
                    expect(
                        CustomControlValidators.numbers(control)
                    ).toEqual(null);
                }
            );
        });

        const invalidCases = [
            '000.000',
            'a9z8az181za',
            '88-',
            '8aa',
            'a88',
            '1818313-',
            'a--',
            '-a',
            '@z&é"&é',
            'ABCJH-',
            'ABCJH',
            '-',
            'a',
            'aaaaaa'
        ];

        invalidCases.forEach((elem, index) => {
            it('should fail control number format index : ' + index, () => {
                const control = new FormControl(elem);
                expect(
                    CustomControlValidators.numbers(control)
                ).not.toEqual(null);
            });
        });
    });

    describe('currency format test', () => {
        const validCases = [
            '123',
            '12,41',
            '11124,52',
            '11111111111111111111111111111111111111124,52',
            '23,32',
            '3,32',
            '234,',
            ',52',
            '12.4'
        ];

        validCases.forEach((elem, index) => {
            it(
                'should success control currency format index : ' + index,
                () => {
                    const control = new FormControl(elem);
                    expect(
                        CustomControlValidators.currencyFormat(control)
                    ).toEqual(null);
                }
            );
        });

        const invalidCases = [
            '12+,41',
            'a',
            'a,23',
            '32,a',
            'a,aa',
            'a,a',
            '12,224242',
            ',5234',
            '12?5234'
        ];

        invalidCases.forEach((elem, index) => {
            it('should fail control currency format index : ' + index, () => {
                const control = new FormControl(elem);
                expect(
                    CustomControlValidators.currencyFormat(control)
                ).not.toEqual(null);
            });
        });
    });

});
