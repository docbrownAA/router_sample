import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
	CanActivateChild,
	NavigationExtras,
	CanLoad,
	Route
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
	constructor(private autrhService: AuthService,
		private router: Router) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {
		console.log('AuthGuard#canActivate called');
		let url: string = state.url;

		return this.checkLogin(url);
	}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);

	}

	checkLogin(url: string): boolean {
		if (this.autrhService.isLoggedIn) {
			return true;
		}

		this.autrhService.redirectUrl = url;

		//Creation d'une session stupide
		let sessionId= '1234567890';

		let navigationExtras: NavigationExtras = {
			queryParams: {'session_id': sessionId},
			fragment: 'anchor'
		}

		this.router.navigate(['/login'], navigationExtras);
		return false;
	}

	canLoad(route: Route): boolean{
		let url = `/${route.path}`;
		return this.checkLogin(url);
	}

}
