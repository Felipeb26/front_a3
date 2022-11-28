import { Agenda } from './../models/agenda';
import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH, MICRO1 } from 'src/environments/environment';
import { USER } from '../models/usuario.model';
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
	providedIn: 'root'
})
export class EndpointsConsultasService {

	@ViewChild("paginator") paginator!: MatPaginator

	constructor (
		private http: HttpClient
	) { }


	getAllConsultas(): Observable<Agenda[]> {
		return this.http.get<Agenda[]>(`${API_PATH}${MICRO1}/consultas`)
	}

	getAllConsultasByParam(param:string): Observable<Agenda[]> {
		return this.http.get<Agenda[]>(`${API_PATH}${MICRO1}/consultas/${param}`)
	}

	getConsultaById(id:any):Observable<Agenda>{
		return this.http.get<Agenda>(`${API_PATH}${MICRO1}/consulta/${id}`)
	}

	saveConsulta(body:Agenda){
		return this.http.post<Agenda>(`${API_PATH}${MICRO1}/consultas`,body)
	}

	updateConsulta(id:any,body:Agenda):Observable<Agenda>{
		return this.http.put<Agenda>(`${API_PATH}${MICRO1}/consulta/${id}`,body);
	}

	deleteConsulta(id: any): Observable<any> {
		return this.http.delete<any>(`${API_PATH}${MICRO1}/consulta/${id}`);
	}
}


