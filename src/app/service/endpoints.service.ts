import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from "rxjs";
import { LoginModel } from 'src/app/models/LoginModel';
import { API_PATH } from 'src/environments/environment';
import { MICRO2 } from 'src/environments/environment.prod';
import { MICRO1 } from '../../environments/environment';
import { MAil } from '../models/email.model';
import { Medico } from '../models/medico';
import { Token } from '../models/token.model';
import { USER } from './../models/usuario.model';


@Injectable({
	providedIn: 'root'
})
export class EndpointsService {


	constructor (
		private http: HttpClient,
	) { }

	fazerLogin(login: LoginModel): Observable<Token> {
		return this.http.post<Token>(`${API_PATH}${MICRO1}/login`, login);
	}

	getAll(): Observable<USER[]> {
		return this.http.get<USER[]>(`${API_PATH}${MICRO1}/users`)
			.pipe();
	}

	getById(id:any):Observable<USER>{
		return this.http.get<any>(`${API_PATH}${MICRO1}/user/${id}`);
	}

	updateUser(id: any, user: USER): Observable<any> {
		return this.http.put<any>(`${API_PATH}${MICRO1}/user/${id}`, user);
	}

	deleteUser(id: any): Observable<any> {
		return this.http.delete<any>(`${API_PATH}${MICRO1}/user/${id}`);
	}

	salvarUsuario(user: USER): Observable<any> {
		return this.http.post<USER>(`${API_PATH}${MICRO1}/users`, user).pipe(first(),)
	}



	getAllDocs(): Observable<Medico[]> {
		return this.http.get<Medico[]>(`${API_PATH}${MICRO1}/docs`)
			.pipe();
	}
	updateDoc(id: any, user: USER): Observable<any> {
		return this.http.put<any>(`${API_PATH}${MICRO1}/docs/${id}`, user);
	}


}
