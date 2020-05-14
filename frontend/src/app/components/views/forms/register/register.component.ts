import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { CustomControlValidators } from 'src/app/utils/custom-control-validators/custom-control-validators';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../services/auth.service';

class FormProperties {
    public static readonly LAST_NAME = 'lastname';
    public static readonly FIRST_NAME = 'firstname';
    public static readonly EMAIL = 'email';
    public static readonly PASSWORD = 'password';
    public static readonly CONFIRM_PASSWORD = 'confirmPassword';
    public static readonly PASSWORD_GROUP = 'passwordGroup';
}
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    FormProperties = FormProperties;

    public googleUrl = environment.googleUrl;
    public facebookUrl = environment.facebookUrl;

    public form: FormGroup;
    isLoadingResults = false;
    matcher = new MyErrorStateMatcher();

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        const passwordGroup = this.formBuilder.group({
            [FormProperties.PASSWORD]: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]],
            [FormProperties.CONFIRM_PASSWORD]: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]]
        }, {
            validators: [
                CustomControlValidators.passwordValidator
            ]
        });
        this.form = this.formBuilder.group({
            [FormProperties.FIRST_NAME]: [null, [Validators.required, Validators.maxLength(150)]],
            [FormProperties.LAST_NAME]: [null, [Validators.required, Validators.maxLength(150)]],
            [FormProperties.EMAIL]: [null, [
                Validators.required, Validators.email, Validators.maxLength(150)
            ]],
            [FormProperties.PASSWORD_GROUP]: passwordGroup
        });
    }

    public isInvalidControl(formControlName: string): boolean {
        return (this.form.get(formControlName).value && this.form.get(formControlName).touched && this.form.get(formControlName).invalid);
    }

    public isInvalidGroup(formGroupName: string, formControlName: string) {
        return (this.form.get(formGroupName).get(formControlName).value
            && this.form.get(formGroupName).get(formControlName).touched
            && this.form.get(formGroupName).get(formControlName).invalid);
    }

    onFormSubmit(form: any) {
        const state = {
            [FormProperties.LAST_NAME]: form.lastname,
            [FormProperties.FIRST_NAME]: form.firstname,
            [FormProperties.EMAIL]: form.email,
            [FormProperties.PASSWORD]: form.passwordGroup.password
        };

        const signUpRequest = Object.assign({}, state);

        this.authService.register(signUpRequest).subscribe(response => {
            alert('You\'re successfully registered. Please login to continue!');
            this.router.navigate(['/login']);
        }, (error => {
            error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        }));
    }

}

/** Error when invalid control is dirty, touched, or submitted. */
class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
