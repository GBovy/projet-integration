import { Pipe, PipeTransform } from '@angular/core';
import { isNil, isNaN } from 'lodash';

/**
 * Allows to format a currency.
 *
 *  {number} value // Integer
 *
 *  {number} defaultValue  // Default value (optional)
 *
 *  {string} currencySign  // Currency sign
 *
 *  {number} decimalLength  // Number of decimals accepted
 *
 *  {string} chunkDelimiter // Symbol which delimits thousands
 *
 *  {string} decimalDelimiter // Symbol which delimits integers' decimals
 *
 *  {string} chunkLength // Number of thousands
 *
 * returns {string}  // Returns a formated currency string
 *
 * @example
 * <div [innerHTML]="equipment.amount | currencyFormat" ></div>
 *
 * @example
 * <div [innerHTML]="equipment.amount | currencyFormat:'$ ':4:' ':',':3" ></div>
 */

@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

    transform(
        value: number,
        currencySign = ' €',
        decimalLength = 2,
        chunkDelimiter = ' ',
        decimalDelimiter = ',',
        chunkLength = 3): string {

        if (isNil(value)) {
            value = 0;
        }

        if (!isNil(value)) {

            if (isNaN(value)) {
                return currencySign + '-';
            }

            const result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
            // tslint:disable-next-line:no-bitwise
            const num = (+value / 100).toFixed(Math.trunc(decimalLength));

            return ((decimalDelimiter ? num.replace('.', decimalDelimiter) : num) + currencySign)
                .replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
        } else {
            return '';
        }
    }
}
