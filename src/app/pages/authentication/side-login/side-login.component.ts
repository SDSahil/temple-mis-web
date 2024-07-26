
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PHONE } from '@app/constants/regex.constants';
import { LoginService } from '@app/login.service';
import { ToastrNotifyService } from '@app/services/toastr-notify.service';
import { UserService } from '@app/services/user.service';


@Component({
  selector: 'app-side-login',
  templateUrl: './side-login.component.html',
  providers: [LoginService],
})
export class AppSideLoginComponent {

  public loginForm: FormGroup;

  constructor(private userService: UserService, private _router: Router, private _toast: ToastrNotifyService, _fb: FormBuilder) {
    this.loginForm = _fb.group({
      phone: ['', [Validators.required, Validators.pattern(PHONE)]],
      password: ['', [Validators.required]]
    });
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public async login(): Promise<void> {
    try {
      if (this.loginForm.invalid) {
        this._toast.showError('Field Pattern does not match', 'Invalid');
        return;
      }
      const body = { ...this.loginForm.value };
      await this.userService.login({ ...body });
      await this.userService.getCurrUser();
      this._router.navigate(['/home']);
    } catch (error: any) {
      const errMsg = error?.error?.message || error?.message || 'Invalid Credentials';
      console.error('error in login()', error);
      this._toast.showError(errMsg);
    }
  }

  /**
   public async testInterseptor() {
     try {
       await this.userService.getCurrUser();
     } catch (error) {
       console.error(error);
     }
   }
   */
}
