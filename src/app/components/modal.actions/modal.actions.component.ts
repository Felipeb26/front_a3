import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { EndpointsConsultasService } from 'src/app/service/endpoints.consultas.service';
import { RoleVerifyService } from 'src/app/service/role.verify.service';
import { Agenda } from './../../models/agenda';
import { Endpoints2Service } from './../../service/endpoints2.service';
import { AlertsService } from './../../utils/alerts.service';

@Component({
	selector: 'app-modal.actions',
	templateUrl: './modal.actions.component.html',
	styleUrls: ['./modal.actions.component.scss']
})
export class ModalActionsComponent implements OnInit {
	@ViewChild(MatTable) table!: MatTable<Agenda>;

	data!: Agenda
	id: string = ""
	requestType: string = ""

	action: string = ""
	today: any = Date.now();
	nome: any = "";
	email: any = "";
	telefone: any = "";
	prioridade: any = "";
	agenda: any = "";
	date!: Date;

	priorid: string = ""
	color: string = ""
	selecteDate: any = "";
	disabled: string = "disabled"

	prioridades: any[] = [
		{ value: "Emergência", color: "#ff0000" },
		{ value: "Urgência", color: "#eeff00" },
		{ value: "Pouco Urgente", color: "#00ff40" },
		{ value: "Não Urgente", color: "#0000ff" },
	]

	constructor (
		@Inject(MAT_DIALOG_DATA) data: any,
		private serviceCheck: RoleVerifyService,
		private consultas: EndpointsConsultasService,
		private endpoints2: Endpoints2Service,
		private alert: AlertsService
	) {
		this.id = data.id;
		this.requestType = data.type
		this.table = data.table
	}

	ngOnInit(): void {
		if (this.requestType.startsWith("edit")) {
			this.disabled = "false";
		}
		this.action = this.requestType;
		if (this.action.startsWith("delete")) {
			this.action = this.action.replace("delete", "deletar");
		} else {
			this.action = this.action.replace("edit", "editar");
		}

		this.consultas.getConsultaById(this.id).subscribe(
			data => {
				this.data = data
				this.initProperties();
			},
			erro => {
				console.log(erro)
			}
		);
	}

	initProperties() {
		this.nome = this.data.nomeUser;
		this.email = this.data.emailUser;
		this.telefone = this.data.telefoneUser;
		this.agenda = this.data.agenda;
		this.prioridade = this.serviceCheck.prioridade(this.data.prioridade!);
	}

	selectPriorid(value: any) {
		this.priorid = value;
		this.prioridades.map(it => {
			if (it.value == value) {
				this.color = it.color;
			}
		});
	}

	selectDate(value: Date) {
		this.selecteDate = value;
	}

	method() {
		if (this.requestType.startsWith("edit")) {
			this.editarConsulta();
		} else {
			this.deletarConsulta();
		}
	}

	editarConsulta() {
		let agenda = this.selecteDate;
		if (this.selecteDate == null || undefined) {
			agenda = this.data.agenda;
		}

		if (agenda < Date.now()) {
			return this.alert.errorT("necessario inserir uma data maior do que a atual!")
		}

		console.log(agenda)
		const consulta = {
			"nomeMedico": this.data.nomeMedico,
			"emailMedico": this.data.emailMedico,
			"nomeUser": this.data.nomeUser,
			"emailUser": this.data.emailUser,
			"telefoneUser": this.data.telefoneUser,
			"agenda": agenda,
			"prioridade": this.priorid
		};
		console.table(consulta)
		this.consultas.updateConsulta(this.id, consulta).subscribe(
			data => {
				this.alert.sucessT(`Consulta de ${data.nomeUser} reagendada com sucesso!`);

				const mail = { user: data.nomeUser, para: data.emailUser, modelo: "reagendamento" }
				this.endpoints2.enviarEmail(mail).subscribe(data => console.log(data), erro => console.log(erro))
			},
			erro => {
				const error = erro.erro;
				if (error == null || undefined) {
					this.alert.errorT(erro.message)
				} else {
					this.alert.errorT(error)
				}
			}
		)
	}

	deletarConsulta() {
		const id = this.id;
		this.consultas.deleteConsulta(id).subscribe(
			data => {
				console.log(data);
				const mail = { user: data.nomeUser, para: data.emailMedico, modelo: "deleta" }
				this.endpoints2.enviarEmail(mail).subscribe(data => console.log(data), erro => console.log(erro))
				this.alert.sucessT(data.message)
				this.table.renderRows();
			},
			erro => {
				console.log(erro)
			}
		)
	}
}
