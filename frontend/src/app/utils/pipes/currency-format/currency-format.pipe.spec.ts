import { CurrencyFormatPipe } from './currency-format.pipe';
import { pipe } from 'rxjs';

describe('Pipe: currencyFormat', () => {

    const myPipe = new CurrencyFormatPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('Input without decimal', () => {
        const onTwoThree = myPipe.transform(123);
        expect(onTwoThree).toEqual('1,23 €');
    });

    it('input with one decimal', () => {
        const onTwoThree = myPipe.transform(1234);
        expect(onTwoThree).toEqual('12,34 €');
    });

    it('input with too many decimal (> 2), round to two maximum', () => {
        const onTwoThree = myPipe.transform(123456);
        expect(onTwoThree).toEqual('1 234,56 €');
    });

    it('input round upper', () => {
        const onTwoThree = myPipe.transform(123456789);
        expect(onTwoThree).toEqual('1 234 567,89 €');
    });

    it('input with decimal, round upper', () => {
        const onTwoThree = myPipe.transform(1234.5678);
        expect(onTwoThree).toEqual('12,35 €');
    });

    it('input with decimal, no round', () => {
        const onTwoThree = myPipe.transform(1234.4678);
        expect(onTwoThree).toEqual('12,34 €');
    });

    it('input invalid value => null', () => {
        const onTwoThree = myPipe.transform(null);
        expect(onTwoThree).toEqual('0,00 €');
    });

    it('input invalid value => undefined', () => {
        const onTwoThree = myPipe.transform(undefined);
        expect(onTwoThree).toEqual('0,00 €');
    });
});
