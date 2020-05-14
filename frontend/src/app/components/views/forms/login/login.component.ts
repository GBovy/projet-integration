import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../services/auth.service';

class FormProperties {
    public static readonly EMAIL = 'email';
    public static readonly PASSWORD = 'password';
}
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    FormProperties = FormProperties;

    public googleUrl = environment.googleUrl;
    public facebookUrl = environment.facebookUrl;

    public form: FormGroup;
    matcher = new MyErrorStateMatcher();
    isLoadingResults = false;

    public isLoggedIn = false;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            [FormProperties.EMAIL]: [null, [
                Validators.required, Validators.email, Validators.maxLength(150)
            ]],
            [FormProperties.PASSWORD]: [null, [
                Validators.required, Validators.minLength(8), Validators.maxLength(150)
            ]]
        });
    }

    public isInvalidControl(formControlName: string): boolean {
        return (this.form.get(formControlName).value && this.form.get(formControlName).touched && this.form.get(formControlName).invalid);
    }

    public onFormSubmit(form: any) {
        const state = {
            [FormProperties.EMAIL]: form.email,
            [FormProperties.PASSWORD]: form.password
        };
        const loginRequest = Object.assign({}, state);

        this.authService.login(loginRequest).subscribe(response => {
            // localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            alert('You\'re successfully logged in!');
            this.router.navigate(['/products']);
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
