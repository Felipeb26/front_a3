import { AlertsService } from './../utils/alerts.service';
import { TokenService } from '../service/interceptors/token.interceptor';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EndpointsService } from '../service/endpoints.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor (
		private endpoints: TokenService,
		private alert: AlertsService,
		private route: Router) { }

	canActivate() {
		const logged = this.endpoints.IsLoggedIn();
		if (logged) {
			return true;
		} else {
			this.route.navigate(["login"])
			this.alert.infoT("necessário logar antes!");
			return false;
		}
	}

}
