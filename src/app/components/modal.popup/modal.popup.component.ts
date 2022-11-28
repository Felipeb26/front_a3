import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EndpointsConsultasService } from 'src/app/service/endpoints.consultas.service';
import { RoleVerifyService } from 'src/app/service/role.verify.service';

@Component({
	selector: 'app-modal.popup',
	templateUrl: './modal.popup.component.html',
	styleUrls: ['./modal.popup.component.scss']
})
export class ModalPopupComponent implements OnInit {

	nome: any = "";
	email: any = "";
	telefone: any = "";
	agenda: any = "";
	prioridade: any = "";
	id: any = ""

	constructor (
		@Inject(MAT_DIALOG_DATA) public data: any,
		private serviceCheck: RoleVerifyService,
		private endpointsConsulta: EndpointsConsultasService) {
		this.id = data
	}

	ngOnInit(): void {
		this.endpointsConsulta.getConsultaById(this.id).subscribe(
			data => {
				this.nome = data.nomeUser;
				this.email = data.emailUser;
				this.telefone = data.telefoneUser;
				this.agenda = data.agenda;
				this.prioridade = this.serviceCheck.prioridade(data.prioridade!)
			},
			erro => {
				console.log(erro)
			}
		)
	}

}
