import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isFinite } from 'lodash';
import { CustomControlValidators } from '../../custom-control-validators/custom-control-validators';

/**
 * @description: This InputCurrencyComponent displays an input where user can enter floating number.
 * The input data is in eurocent. (example: '2900' for 29,00€)
 * A mask is used with the format '0*.00' and the output value is a Javascript number object.
 * To use it:
 * - Plug formControlName attribute in the selector.
 * @example
 * <app-input-currency formControlName="inputCurrencyCtrl"></app-input-currency>
 */
@Component({
    selector: 'app-input-currency',
    templateUrl: './input-currency.component.html',
    styleUrls: ['./input-currency.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputCurrencyComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputCurrencyComponent),
            multi: true,
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputCurrencyComponent implements OnInit, ControlValueAccessor, OnDestroy, Validator {

    public customPatterns = {
        0: { pattern: /\d/ },
        P: { pattern: /[,|.]/ },
        9: { pattern: /\d{0,2}/ }
    };

    public inputCurrencyCtrl: FormControl;
    private subscription: Subscription;

    constructor() {
        this.inputCurrencyCtrl = new FormControl();
    }

    ngOnInit() {
        this.subscription = this.inputCurrencyCtrl.valueChanges.subscribe(value => {
            // Convert value to Javascript number.
            this.onChange(this.formatToCents(value));
            this.onTouched();
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public onChange = (data: number) => { };
    public onTouched = () => { };

    // ---------- ControlValueAccessor IMPLEMENTATION ----------

    public registerOnChange(fn) {
        this.onChange = fn;
    }

    public writeValue(value: number) {
        // Converts to string and insert in inputCurrencyCtrl
        if (this.formatToCents(this.inputCurrencyCtrl.value) !== value) {
            let finalValue = '';
            if (isFinite(value)) {
                finalValue = (value / 100).toFixed(2).replace('.', ',');
            }
            this.inputCurrencyCtrl.setValue(finalValue, { emitEvent: false });
        }
    }

    public registerOnTouched(fn) {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.inputCurrencyCtrl.disable() : this.inputCurrencyCtrl.enable();
    }


    // ---------- Validator IMPLEMENTATION ----------

    /**
     * Communicates control validation to the parent form
     */
    public validate(callerCtrl: FormControl) {
        return CustomControlValidators.currencyFormat(this.inputCurrencyCtrl);
    }

    public formatToCents(value: string): number {
        return value ? +(+(value.replace(',', '.')) * 100).toFixed(0) : null;
    }

}
