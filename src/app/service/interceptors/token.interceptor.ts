import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { EncodesService } from '../../utils/encodes.service';
import { LoadingService } from '../../utils/loading.service';

@Injectable({
	providedIn: 'root'
})
export class TokenService implements HttpInterceptor {
	private activeRequest = 0;
	constructor (
		private load: LoadingService,
		private encodes: EncodesService,
	) { }

	IsLoggedIn() {
		const token = localStorage.getItem("tk") != null
		return token;
	}

	haveAcess(){
		const _token = localStorage.getItem("tk") ||"";
		const _extracted = this.encodes.decodeString(_token);
		const _decoded = this.encodes.decodeString(_extracted);

		const index = _decoded!.indexOf(":{")
		const lastIndex = _decoded!.lastIndexOf("},")
		const user = _decoded!.substring(index + 1, lastIndex + 1);
		const _data = JSON.parse(user);
		return _data.role;
	}


	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.activeRequest === 0) {
			this.load.show();
		}
		this.activeRequest++;
		let token = localStorage.getItem("tk");
		token = this.encodes.decodeString(token);
		let jwtToken = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		})

		return next.handle(jwtToken).pipe(
			finalize(() => {
				this.activeRequest--;
				if (this.activeRequest === 0) {
					this.load.hide();
				}
			})
		);
	}
}
