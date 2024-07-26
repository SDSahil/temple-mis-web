import { AbstractControl, AbstractControlOptions } from "@angular/forms";

export function passwordMatchValidator(password: string, rePassword: string): AbstractControlOptions {
    return {
        validators: (control: AbstractControl): { [key: string]: boolean } | null => {
            const pswd = control.get(password);
            const rePswd = control.get(rePassword);
            if (pswd?.pristine || rePswd?.pristine) {
                return null;
            }
            return pswd?.value !== rePswd?.value ? { misMatch: true } : null
        },
        updateOn: "change"
    }
}