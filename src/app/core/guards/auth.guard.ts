import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ConfigService } from '../services/config-service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private configService: ConfigService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.configService.isDemoVersion) {
			if (localStorage.getItem('demo_token')) {
				return true;
			}

			this.router.navigate(['/prepare']);
			return false;
		} else {
			if (localStorage.getItem('token')) {
				return true;
			}

			// not logged in so redirect to login page with the return url
			this.configService.isDemoVersion
				? this.router.navigate(['/prepare'])
				: this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
			return false;
		}
	}
}
