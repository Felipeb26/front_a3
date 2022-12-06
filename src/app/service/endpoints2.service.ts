import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH, MAIL } from 'src/environments/environment';
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
		return this.http.post<any>(`${API_PATH}${MAIL}/mail`, mail);
	}

	emailSimples(mail: MAil): Observable<any> {
		return this.http.post<any>(`${API_PATH}${MAIL}/send`, mail);
	}

}
