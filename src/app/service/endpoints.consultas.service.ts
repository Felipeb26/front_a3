import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { API_PATH, CONSULTA } from 'src/environments/environment';
import { Agenda } from './../models/agenda';

@Injectable({
	providedIn: 'root'
})
export class EndpointsConsultasService {

	@ViewChild("paginator") paginator!: MatPaginator

	constructor (
		private http: HttpClient
	) { }


	getAllConsultas(): Observable<Agenda[]> {
		return this.http.get<Agenda[]>(`${API_PATH}${CONSULTA}/consultas`)
	}

	getAllConsultasByParam(param: string): Observable<Agenda[]> {
		return this.http.get<Agenda[]>(`${API_PATH}${CONSULTA}/consultas/${param}`)
	}

	getConsultaById(id: any): Observable<Agenda> {
		return this.http.get<Agenda>(`${API_PATH}${CONSULTA}/consulta/${id}`)
	}

	saveConsulta(body: Agenda) {
		return this.http.post<Agenda>(`${API_PATH}${CONSULTA}/consultas`, body)
	}

	updateConsulta(id: any, body: Agenda): Observable<Agenda> {
		return this.http.put<Agenda>(`${API_PATH}${CONSULTA}/consulta/${id}`, body);
	}

	deleteConsulta(id: any): Observable<any> {
		return this.http.delete<any>(`${API_PATH}${CONSULTA}/consulta/${id}`);
	}
}


