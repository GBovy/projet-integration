import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { UserRole } from '../../../../models/enums/user-role.enum';
import { UserService } from '../../../../services/user.service';
import { Country } from './../../../../models/enums/country.enum';
import { VehicleType } from './../../../../models/enums/vehicule-type.enum';
import { UserInterface } from 'src/app/models/interfaces/user.interface';
import { User } from 'src/app/models/user.model';
import { CustomControlValidators } from 'src/app/utils/custom-control-validators/custom-control-validators';
import { TransitionCheckState } from '@angular/material';
import { take } from 'rxjs/operators';

class ProfileProperties {
    public static readonly LAST_NAME = 'lastname';
    public static readonly FIRST_NAME = 'firstname';
    public static readonly EMAIL = 'email';
    public static readonly PASSWORD = 'password';
    public static readonly CONFIRM_PASSWORD = 'confirmPassword';
    public static readonly PASSWORD_GROUP = 'passwordGroup';
    public static readonly ROLE = 'userRole';
    public static readonly ADDRESS = 'address';
    public static readonly CITY = 'city';
    public static readonly ZIP = 'zipCode';
    public static readonly COUNTRY = 'country';
    public static readonly BANKING_ACCOUNT = 'bankingAccount';
    // public static readonly CREDIT_CARD = 'creditCard';
    // public static readonly CREDIT_CARD_VALIDITY = 'creditCardValidity';
    public static readonly PAYPAL = 'paypal';
    public static readonly VEHICLE_MODEL = 'vehicleModel';
    public static readonly VEHICLE_YEAR = 'vehicleYear';
    // public static readonly IMAGE_URL = 'imageUrl';

    public static readonly GREEN_CARD = 'greenCard';
    public static readonly INSURANCE_DOCUMENT = 'insuranceDocument';
    public static readonly DRIVING_LICENCE = 'drivingLicence';
}
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public ProfileProperties = ProfileProperties;
    public UserRoleEnum = UserRole;
    public CountryEnum = Country;
    public VehicleModelEnum = VehicleType;

    public user: UserInterface;
    public isProfileCompleted: boolean;

    public years: number[];

    public form: FormGroup;
    public documentsForm: FormGroup;

    public get isLivreur(): boolean {
        return !_.isNil(this.user)
            && !_.isNil(this.form.get(ProfileProperties.ROLE).value)
            && this.form.get(ProfileProperties.ROLE).value === UserRole.LIVREUR;
    }

    constructor(
        private userService: UserService,
        private fb: FormBuilder
    ) {
        this.constructForm();
        this.years = this.getYears(1900, new Date().getFullYear());
    }

    ngOnInit() {
        this.userService.isProfileCompleted()
            .pipe(take(1))
            .subscribe((response: boolean) => {
                this.isProfileCompleted = response;
            });

        this.userService.getCurrentUser()
            .pipe(take(1))
            .subscribe((res: UserInterface) => {
                this.user = res;
                this.fillFromData(res);
            });
    }

    public isInvalidGroup(formGroupName: string, formControlName: string) {
        return (this.form.get(formGroupName).get(formControlName).value
            && this.form.get(formGroupName).get(formControlName).touched
            && this.form.get(formGroupName).get(formControlName).invalid);
    }

    public isInvalidControl(formControlName: string): boolean {
        return (this.form.get(formControlName).value
            && this.form.get(formControlName).touched
            && this.form.get(formControlName).invalid);
    }

    public onSubmit() {
        const user = new User ({
            [ProfileProperties.FIRST_NAME]: this.form.controls[ProfileProperties.FIRST_NAME].value,
            [ProfileProperties.LAST_NAME]: this.form.controls[ProfileProperties.LAST_NAME].value,
            [ProfileProperties.EMAIL]: this.form.controls[ProfileProperties.EMAIL].value,
            [ProfileProperties.PASSWORD]: this.form.get(ProfileProperties.PASSWORD_GROUP).get(ProfileProperties.PASSWORD).value,
            [ProfileProperties.ROLE]: this.form.controls[ProfileProperties.ROLE].value,
            [ProfileProperties.ADDRESS]: this.form.controls[ProfileProperties.ADDRESS].value,
            [ProfileProperties.CITY]: this.form.controls[ProfileProperties.CITY].value,
            [ProfileProperties.COUNTRY]: this.form.controls[ProfileProperties.COUNTRY].value,
            [ProfileProperties.ZIP]: this.form.controls[ProfileProperties.ZIP].value,
            [ProfileProperties.BANKING_ACCOUNT]: this.form.controls[ProfileProperties.BANKING_ACCOUNT].value,
            // [ProfileProperties.CREDIT_CARD]: this.form.controls[ProfileProperties.CREDIT_CARD].value,
            // [ProfileProperties.CREDIT_CARD_VALIDITY]: this.form.controls[ProfileProperties.CREDIT_CARD_VALIDITY].value,
            [ProfileProperties.PAYPAL]: this.form.controls[ProfileProperties.PAYPAL].value,
            [ProfileProperties.VEHICLE_MODEL]: this.form.controls[ProfileProperties.VEHICLE_MODEL].value,
            [ProfileProperties.VEHICLE_YEAR]: this.form.controls[ProfileProperties.VEHICLE_YEAR].value,
            // [ProfileProperties.IMAGE_URL]: this.form.controls[ProfileProperties.IMAGE_URL].value
        } as UserInterface);
        this.userService.updateCurrentUser(user)
            .subscribe(res => {
                this.user = res;
                this.fillFromData(res);
                this.userService.isProfileCompleted()
                    .subscribe((response: boolean) => {
                        this.isProfileCompleted = response;
                    });
            });
    }

    private getYears(start: number, end: number): number[] {
        const result = [];
        for (let i = end; i >= start; i--) {
            result.push(i);
        }
        return result;
    }

    private constructForm() {
        const passwordGroup = this.fb.group({
            [ProfileProperties.PASSWORD]: ['', [Validators.minLength(8), Validators.maxLength(150)]],
            [ProfileProperties.CONFIRM_PASSWORD]: ['', [Validators.minLength(8), Validators.maxLength(150)]]
        }, {
            validators: [
                CustomControlValidators.passwordValidator
            ]
        });
        this.form = this.fb.group({
            [ProfileProperties.LAST_NAME]: ['', [Validators.required, Validators.maxLength(150)]],
            [ProfileProperties.FIRST_NAME]: ['', [Validators.required, Validators.maxLength(150)]],
            [ProfileProperties.EMAIL]: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
            [ProfileProperties.PASSWORD_GROUP]: passwordGroup,
            [ProfileProperties.ROLE]: ['', [Validators.required]],
            [ProfileProperties.ADDRESS]: ['', [Validators.required]],
            [ProfileProperties.COUNTRY]: [null, [Validators.required]],
            [ProfileProperties.CITY]: ['', [Validators.required, Validators.maxLength(150)]],
            [ProfileProperties.ZIP]: ['', [Validators.required, Validators.maxLength(20)]],
            [ProfileProperties.BANKING_ACCOUNT]: ['', [Validators.required, Validators.maxLength(50)]],
            // [ProfileProperties.CREDIT_CARD]: ['', [, Validators.maxLength(50)]],
            // [ProfileProperties.CREDIT_CARD_VALIDITY]: ['', [Validators.minLength(6), Validators.maxLength(6)]],
            [ProfileProperties.PAYPAL]: ['', []],
            [ProfileProperties.VEHICLE_MODEL]: ['', []],
            [ProfileProperties.VEHICLE_YEAR]: ['', []],
            // [ProfileProperties.IMAGE_URL]: ['', []]
        });
        this.documentsForm = this.fb.group({
            [ProfileProperties.GREEN_CARD]: [null, [
                CustomControlValidators.requiredFileType(['png', 'jpg', 'pdf'])
            ]], // requis si role livreur
            [ProfileProperties.INSURANCE_DOCUMENT]: [null, [
                CustomControlValidators.requiredFileType(['png', 'jpg', 'pdf'])]], // requis si role livreur
            [ProfileProperties.DRIVING_LICENCE]: [null, [
                CustomControlValidators.requiredFileType(['png', 'jpg', 'pdf'])
            ]] // requis si role livreur
        });
    }

    private fillFromData(profileData: UserInterface): void {
        this.form.patchValue(profileData);
    }
}
