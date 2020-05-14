import { FormGroup } from '@angular/forms';

export class MapsUtils {


    /**
     * Concats values from each formControls of an address's formGroup.
     * Calls the OSM map querier.
     * @param addressPropertyName as StartAddressProperties | EndAddressProperties
     * @returns a query to call throught the WS.
     */
    public static formatAddressQuery(form: FormGroup, addressPropertyName: any): string {
        return this.createMarkerQuery(
            (form.controls[addressPropertyName.ADDRESS].value.replace(/\s/g, '+') + ',+'
                + form.controls[addressPropertyName.CITY].value.replace(/\s/g, '+') + ',+'
                + form.controls[addressPropertyName.ZIP_CODE].value.replace(/\s/g, '+') + ',+'
                + form.controls[addressPropertyName.COUNTRY].value.replace(/\s/g, '+'))
        );
    }

    /**
     * Creates a query to call throught the WS to get the markers informations
     * @param toQuery an address formatted as string to make a call
     * @returns a URI that returns the markers informations
     */
    public static createMarkerQuery(addressToQuery: string): string {
        return ('https://nominatim.openstreetmap.org/search?q=' + addressToQuery + '&format=jsonv2&polygon=1&addressdetails=1');
    }
}
