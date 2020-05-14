import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

export interface DialogData {
    amount: string;
}
class StripeFormProperties {
    public static readonly NAME = 'name';
}
@Component({
    selector: 'app-order-modal',
    templateUrl: './order-modal.component.html',
    styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

    StripeFormProperties = StripeFormProperties;

    public stripeForm: FormGroup;
    public errorMessage: string;
    private elements: Elements;
    private stripeElement: StripeElement;

    private elementsOptions: ElementsOptions = {
        locale: <'fr' | 'en'>this.translateService.currentLang
    };

    constructor(
        public dialogRef: MatDialogRef<OrderModalComponent>,
        private stripeService: StripeService,
        private translateService: TranslateService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.stripeForm = this.constructForm();
    }

    ngOnInit() {
        // Generating Stripe card template
        this.stripeService.elements(this.elementsOptions).pipe(take(1))
            .subscribe(elements => {
                this.elements = elements;
                console.log('elements ::: ', elements);
                // Only mount the element the first time
                if (!this.stripeElement) {
                    this.stripeElement = this.elements.create('card', {
                        style: {
                            base: {
                                iconColor: '#666EE8',
                                color: '#31325F',
                                lineHeight: '40px',
                                fontWeight: 300,
                                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                fontSize: '18px',
                                '::placeholder': {
                                    color: '#CFD7E0'
                                }
                            }
                        }
                    });
                    this.stripeElement.mount('#card-element');
                }
            });
    }

    /**
     * Buying action
     *
     * card number format ex: 9546 4865 3138 1351
     */
    public buyAction() {
        if (this.stripeForm.valid) {
            const name = this.stripeForm.get('name').value;
            this.stripeService
                .createToken(this.stripeElement, { name })
                .subscribe(result => {
                    console.log('results === ', this.stripeElement, result);
                    if (result.token) {
                        // Use the token to create a charge or a customer
                        // https://stripe.com/docs/charges
                        console.log('res token', result.token);

                        this.dialogRef.close(result); // Closes modal with results

                    } else if (result.error) { // Error creating the token
                        this.errorMessage = result.error.message;
                    }
                });
        }
    }

    /**
     * Validating form control name
     * @param formControlName the property name
     */
    public isInvalidControl(formControlName: string): boolean {
        return (this.stripeForm.get(formControlName).value
            && this.stripeForm.get(formControlName).touched
            && this.stripeForm.get(formControlName).invalid);
    }

    /**
     * Cancel action
     */
    public closeModal(): void {
        this.dialogRef.close(false);
    }

    /**
     * Constructing form
     */
    private constructForm() {
        return this.fb.group({
            [StripeFormProperties.NAME]: ['', [Validators.required]]
        });
    }

}
