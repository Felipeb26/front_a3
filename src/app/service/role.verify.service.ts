import { Injectable } from '@angular/core';
import { PrioridadesEnum } from './../models/prioridade.enum';

@Injectable({
	providedIn: 'root'
})
export class RoleVerifyService {
	local: string | null = ""

	constructor (
	) { }

	showIcon = async () => {
		this.local = localStorage.getItem("is");
		if (this.local == null || undefined) {
			this.local = "false"
		}
		if (this.local!.startsWith("true")) {
			localStorage.setItem("is", "true");
			return this.local;
		} else {
			localStorage.setItem("is", "false");
			return this.local;
		}
	}

	ShowAndHide(elementos: HTMLCollectionOf<HTMLElement>, display: string) {
		for (let i = 0; i < elementos.length; i++) {
			elementos[i].style.display = display;
		}
	}

	prioridade(value: string) {
		switch (value) {
			case PrioridadesEnum.EMERGENCIA:
				return "EMERGENCIA";
				break;
			case PrioridadesEnum.URGENCIA:
				return "URGENCIA";
				break;
			case PrioridadesEnum.NAO_URGENTE:
				return "NAO URGENTE";
				break;
			case PrioridadesEnum.POUCO_URGENTE:
				return "POUCO URGENTE";
				break;
			default:
				return "NAO URGENTE";
		}
	}

	prioridadeColor(value: string) {
		switch (value) {
			case PrioridadesEnum.EMERGENCIA:
				return PrioridadesEnum.EMERGENCIA;
				break;
			case PrioridadesEnum.URGENCIA:
				return PrioridadesEnum.URGENCIA
				break;
			case PrioridadesEnum.NAO_URGENTE:
				return PrioridadesEnum.NAO_URGENTE;
				break;
			case PrioridadesEnum.POUCO_URGENTE:
				return PrioridadesEnum.POUCO_URGENTE;
				break;
			default:
				return PrioridadesEnum.NAO_URGENTE;
		}
	}
}
