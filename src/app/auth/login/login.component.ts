import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	message: string;


	constructor(public authService: AuthService,
		public router: Router) {
		this.setMessage();
	}

	setMessage() {
		this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
	}

	login() {
		let navigationExtras : NavigationExtras = {
			queryParamsHandling: 'preserve',
			preserveFragment: true
		}
		this.message = 'Trying to log in ...';

		this.authService.login().subscribe(() => {
			this.setMessage();
			if (this.authService.isLoggedIn) {
				let rediirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/admin';
				this.router.navigateByUrl(rediirect, navigationExtras);
			}
		});
	}

	logout() {
		this.authService.logout();
		this.setMessage();
	}

}
