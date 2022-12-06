import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from "rxjs";
import { LoginModel } from 'src/app/models/LoginModel';
import { API_PATH } from 'src/environments/environment';
import { Medico } from '../models/medico';
import { Token } from '../models/token.model';
import { CRUD } from './../../environments/environment.prod';
import { USER } from './../models/usuario.model';


@Injectable({
	providedIn: 'root'
})
export class EndpointsService {


	constructor (
		private http: HttpClient,
	) { }

	fazerLogin(login: LoginModel): Observable<Token> {
		return this.http.post<Token>(`${API_PATH}${CRUD}/login`, login);
	}

	getAll(): Observable<USER[]> {
		return this.http.get<USER[]>(`${API_PATH}${CRUD}/users`)
			.pipe();
	}

	getById(id: any): Observable<USER> {
		return this.http.get<any>(`${API_PATH}${CRUD}/user/${id}`);
	}

	updateUser(id: any, user: USER): Observable<any> {
		return this.http.put<any>(`${API_PATH}${CRUD}/user/${id}`, user);
	}

	deleteUser(id: any): Observable<any> {
		return this.http.delete<any>(`${API_PATH}${CRUD}/user/${id}`);
	}

	salvarUsuario(user: USER): Observable<any> {
		return this.http.post<USER>(`${API_PATH}${CRUD}/users`, user).pipe(first(),)
	}

	getAllDocs(): Observable<Medico[]> {
		return this.http.get<Medico[]>(`${API_PATH}${CRUD}/docs`)
			.pipe();
	}
	updateDoc(id: any, user: USER): Observable<any> {
		return this.http.put<any>(`${API_PATH}${CRUD}/docs/${id}`, user);
	}


}
