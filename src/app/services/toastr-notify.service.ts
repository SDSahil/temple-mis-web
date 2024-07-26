import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotifyService {

  private readonly toastOpts: any = {
    easing: 'ease-in',
    easeTime: 1000
  };

  constructor(private _toastr: ToastrService) { }

  showSuccess(message: string, title: string = 'Success'): void {
    this._toastr.success(message, title, this.toastOpts);
  }

  showError(message: string, title: string = 'Error'): void {
    this._toastr.error(message, title, this.toastOpts);
  }

  showWarning(message: string, title: string = 'Warning'): void {
    this._toastr.warning(message, title, this.toastOpts);
  }

  showInfo(message: string, title: string = 'Info'): void {
    this._toastr.info(message, title, this.toastOpts);
  }
}
