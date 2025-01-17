import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export class CustomeValidators {
    constructor() {}

    static onlyChar(): ValidatorFn {
        return (control: AbstractControl) : { [key: string]:boolean } | null => {
            if(control.value === '') return null;

            let re = new RegExp('^[a-zA-Z]*$');
            if(re.test(control.value)) {
                return null;
            } else {
                return { onlyChar: true} 
            }
        };
    }

    static mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if(matchingControl.errors && !matchingControl.errors['mustMatch']) {
                return;
            }

            if(control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
            return null;
        }
    }
}