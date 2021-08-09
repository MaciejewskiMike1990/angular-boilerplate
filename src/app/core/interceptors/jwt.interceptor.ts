import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'app/core/services/api/auth/account.service';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private accountService: AccountService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token');
		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: 'jwt ' + token,
				},
			});
		}

		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401 && !error.url.includes('integration')) {
					this.accountService.logout();
					return throwError(error);
				} else if (error.status === 403) {
					return throwError(error);
				} else if (error.status === 500) {
					return throwError(error);
				} else {
					return throwError(error);
				}
			}),
		);
	}
}
