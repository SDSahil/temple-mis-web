import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as config } from '@env/environment';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '@app/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currUsrDetail?: User;

  constructor(private _http: HttpClient, private authService: AuthService) { }

  public async checkPhone(phone: number) {
    try {
      let params = new HttpParams();
      params = params.append('phone', phone);
      return await lastValueFrom(this._http.get(`${config.serverUrl}/v1/api/users/check-phone`, { params }));
    } catch (error) {
      throw error;
    }
  }

  public async signup(body: any) {
    try {
      return await lastValueFrom(this._http.post(`${config.serverUrl}/v1/api/users/signup`, { ...body }));
    } catch (error) {
      throw error;
    }
  }

  public async login(body: any): Promise<void> {
    try {
      const result: any = await lastValueFrom(this._http.post(`${config.serverUrl}/v1/api/users/login`, { ...body }));
      if (!result?.token) throw { message: 'token not found', result };
      this.authService.login(result.token);
    } catch (error) {
      throw error;
    }
  }

  public async getCurrUser(): Promise<void> {
    try {
      const result: any = await lastValueFrom(this._http.get(`${config.serverUrl}/v1/api/users/current-user`));
      this.currUsrDetail = { ...result };
      // console.log(this.currUsrDetail?.email);
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  public getCurrUsrDet(): User | undefined {
    return this.currUsrDetail;
  }
}
