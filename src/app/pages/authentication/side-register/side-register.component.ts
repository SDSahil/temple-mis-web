import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '@app/configs/password-validator.config';
import { ALPHABETICAL_STRING, EMAIL, PASSWORD, PHONE } from '@app/constants/regex.constants';
import { ToastrNotifyService } from '@app/services/toastr-notify.service';
import { UserService } from '@app/services/user.service';


@Component({
  selector: 'app-side-register',
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent implements OnInit {
  public userForm: FormGroup;
  public showPswdHint: boolean = false;
  public isLoading: boolean = false;

  constructor(private _fb: FormBuilder, private _router: Router, private _toast: ToastrNotifyService, private userService: UserService) {
    this.userForm = this._fb.group({
      name: this._fb.group({
        firstName: ['', [Validators.required, Validators.pattern(ALPHABETICAL_STRING)]],
        middleName: ['', Validators.pattern(ALPHABETICAL_STRING)],
        lastName: ['', [Validators.required, Validators.pattern(ALPHABETICAL_STRING)]]
      }),
      email: ['', Validators.pattern(EMAIL)],
      phone: ['', [Validators.required, Validators.pattern(PHONE)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD)]],
      rePassword: ['', [Validators.required, Validators.pattern(PASSWORD)]]
    }, passwordMatchValidator('password', 'rePassword'));
  }

  ngOnInit(): void { }

  public get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  public get fname(): { [key: string]: AbstractControl } {
    return ((this.userForm.get('name') as FormGroup).controls);
  }

  public pswdHintHandler(): void {
    this.showPswdHint = !this.showPswdHint;
  }

  public async checkPhone(event: any): Promise<void> {
    try {
      const phoneVal: string = event?.target?.value ?? '';
      
      if (!PHONE.test(phoneVal)) {
        return;
      }

      const result: any = await this.userService.checkPhone(+phoneVal);
      if (result?.userId) {
        this.userForm.controls['phone'].setErrors({ isPhoneExists: true });
      }
    } catch (error) {
      console.error(`Error in checkPhone(): ${error}`);
      this._toast.showError('Failed to check phone');
    }
  }

  public async onSubmit(): Promise<void> {
    try {
      if (this.userForm.invalid) {
        throw { message: 'Invalid Entry' };
      }
      this.isLoading = true;
      const { rePassword, ...body } = this.userForm.value;
      const result: any = await this.userService.signup(body);
      if (result?.userId) {
        this._toast.showSuccess('Use your phone and Password to login', 'Account created successfully');
        this._router.navigate(['/authentication/side-login']);
      }
    } catch (error: any) {
      console.error(`Error in onSubmit(): ${error}`);
      const msg = error?.message ?? 'Failed to create account';
      this._toast.showError(msg);
    } finally {
      this.isLoading = false;
    }
  }

}
