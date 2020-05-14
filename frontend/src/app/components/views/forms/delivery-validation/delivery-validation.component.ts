import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-delivery-validation',
    templateUrl: './delivery-validation.component.html',
    styleUrls: ['./delivery-validation.component.scss']
})
export class DeliveryValidationComponent implements OnInit {
    form = new FormGroup({
        code: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
        comments: new FormControl('', [])

    });
    constructor() { }

    ngOnInit() { }

    public onSubmit() {
        alert(JSON.stringify(this.form.value))
    }

}
