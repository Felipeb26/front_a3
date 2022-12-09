import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AlertsService } from '../utils/alerts.service';
import { TokenService } from './../service/interceptors/token.interceptor';

@Injectable({
	providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

	constructor (
		private service: TokenService,
		private alert: AlertsService) { }

	canActivate() {
		let _have = this.service.haveAcess();
		_have = new String(_have)

		if (_have.startsWith("admin") || _have.startsWith("1") || _have.startsWith("0")) {
			return true
		} else {
			this.alert.infoT("não autorizado acesso!")
			return false;
		}
	}

}
