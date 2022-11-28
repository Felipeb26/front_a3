import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH, MICRO2 } from 'src/environments/environment';
import { MAil } from '../models/email.model';

@Injectable({
	providedIn: 'root'
})
export class Endpoints2Service {

	constructor (
		private http:HttpClient
	) { }

	// micro do email

	enviarEmail(mail: MAil): Observable<any> {
		return this.http.post<any>(`${API_PATH}${MICRO2}/index`, mail);
	}

	boasVindasUser(email: MAil): Observable<any> {
		return this.http.post<MAil>(`${API_PATH}${MICRO2}/bem-user`, email);
	}

	boasVindasDoc(email: MAil): Observable<any> {
		return this.http.post<MAil>(`${API_PATH}${MICRO2}/bem-doc`, email);
	}

	consultaDeletada(email: MAil): Observable<any> {
		return this.http.post<MAil>(`${API_PATH}${MICRO2}/consult-del`, email);
	}

	consultaReagendada(email: MAil): Observable<any> {
		return this.http.post<MAil>(`${API_PATH}${MICRO2}/consult-rea`, email);
	}
}
