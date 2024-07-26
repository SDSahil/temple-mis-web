import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '@app/services/auth.service';
import { ErrorNames } from '@app/enums/errorNames.enum';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.authService.getToken();
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
    }

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => this.handleHttpError(err.error || err)));
  }

  private handleHttpError(err: any): Observable<any> {
    if (err?.name == ErrorNames.TOKEN_EXPIRE) {
      this.authService.logout();
      // return of({ error: err, isError: true });
      window.location.reload();
    }

    return throwError(() => err);
  }

}
