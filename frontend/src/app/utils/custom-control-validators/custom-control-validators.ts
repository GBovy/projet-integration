import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import moment from 'moment-es6';
import { isNil } from 'lodash';

export class CustomControlValidators {

    /**
     * @description: Verifies that is an integer
     * If yes, returns null
     * If not, returns an object { valid: false, value: control.value }
     */
    static numbers(control: FormControl) {
        if (control.value && control.value.length > 0) {
            const expr = /^[0-9]*$/;
            const matches = new RegExp(expr).test(control.value);
            return !matches ? { invalid_number: { valid: false, value: control.value } } : null;
        } else {
            return null;
        }
    }

    /**
     * @description: Verifies that a currency format from a FormControl looks alike 0* or 0*, or 0*.0 or 0*.00
     * If yes, returns null
     * If not, returns an object { valid: false, value: control.value }
     */
    static currencyFormat(control: FormControl) {
        if (control.value && control.value.length > 0) {
            const expr = /^\d*[,|.]?\d{0,2}$/;
            const matches = new RegExp(expr).test(control.value);
            return !matches ? { invalid_currency_format: { valid: false, value: control.value } } : null;
        } else {
            return null;
        }
    }


    /**
     * Check if value is a valid date
     */
    static validDate(c: FormControl) {
        const date = c.value;
        let errors: ValidationErrors | null = null;
        if (date && !moment(date).isValid()) {
            errors = {
                invalidDate: true
            };
        }
        return errors;
    }

    public static dateFormat(control: FormControl) {
        if (control.value && control.value.length > 0) {
            const expr = /^\d{2}\/\d{2}\/\d{4}$/;
            const matches = new RegExp(expr).test(control.value);
            return !matches ? { invalid_date_format: { valid: false, value: control.value } } : null;
        } else {
            return null;
        }
    }

    /**
     *
     * @param minDate value included
     * @param maxDate value included
     */
    static rangeDateValidator(
        minDate?: Date,
        maxDate?: Date
    ): ValidatorFn {
        const validator: ValidatorFn = (targetDateControl: FormControl): { [key: string]: any } | null => {
            let result = null;
            if (isNil(minDate) && isNil(maxDate)) {
                console.warn('You have to pass at least one parameter!');
            } else if (targetDateControl.value &&
                moment(targetDateControl.value).isValid()
            ) {
                let isTargetDateValid = false;
                const targetDateMoment = moment(targetDateControl.value);
                if (isNil(minDate) && maxDate) {
                    // Case only received maxDate
                    const maxDateMoment = moment(maxDate);
                    isTargetDateValid = targetDateMoment.isSameOrBefore(maxDateMoment, 'day');

                } else if (isNil(maxDate) && minDate) {
                    // Case only received minDate
                    const minDateMoment = moment(minDate);
                    isTargetDateValid = targetDateMoment.isSameOrAfter(minDateMoment, 'day');
                } else if (maxDate && minDate) {
                    // Case received minDate and maxDate
                    const maxDateMoment = moment(maxDate);
                    const minDateMoment = moment(minDate);
                    isTargetDateValid = targetDateMoment.isBetween(minDateMoment, maxDateMoment, 'day', '[]');
                }
                result = isTargetDateValid ? null : { rangeDateError: { value: targetDateControl.value } as ValidationErrors };
            }
            return result;
        };
        return validator;
    }

    public static passwordValidator(formGroup: FormGroup) {
        if ((!formGroup.get('password').value && formGroup.get('confirmPassword').value)
            || (formGroup.get('password').value && !formGroup.get('confirmPassword').value)
            || formGroup.get('password').value !== formGroup.get('confirmPassword').value) {
            return { 'invalidPasswords': true };
        }
        return null;
    }

    public static requiredFileType(types: string[]) {
        return function (control: FormControl) {
            const file = control.value;
            if (file) {
                const extension = file.name.split('.')[1].toLowerCase();
                types.map(type => {
                    if (type.toLowerCase() !== extension.toLowerCase()) {
                        return { requiredFileType: true };
                    }
                });
                return null;
            }

            return null;
        };
    }
}
