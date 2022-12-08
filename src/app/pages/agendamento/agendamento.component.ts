import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/models/agenda';
import { USER } from 'src/app/models/usuario.model';
import { EndpointsConsultasService } from 'src/app/service/endpoints.consultas.service';
import { EndpointsService } from 'src/app/service/endpoints.service';
import { RoleVerifyService } from 'src/app/service/role.verify.service';
import { AlertsService } from './../../utils/alerts.service';
import { EncodesService } from './../../utils/encodes.service';

@Component({
	selector: 'app-agendamento',
	templateUrl: './agendamento.component.html',
	styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
	agendamentos: Agenda[] = [];
	emailConsulta: string = ""
	//request consulta -|

	emailMedico: string = ""
	nomeUser: string = ""
	emailUser: string = ""
	telefoneUser: string = ""

	//cadatro e inputs -||
	especialidades: USER[] = []
	medicos: USER[] = []
	medico: string = ""
	selectDate: any

	especial: string = ""
	data: any
	doc: string = ""
	espe: any = ""

	disabled: string = "disabled"
	submit = document.getElementsByClassName("submit") as HTMLCollectionOf<HTMLElement>;

	displayedColumns: string[] = ["nome", "email", "especialidade", "agenda", "actions"]

	constructor (
		private route: Router,
		private encodes: EncodesService,
		private alert: AlertsService,
		private endpoints: EndpointsService,
		private consultas: EndpointsConsultasService,
		private service:RoleVerifyService,
	) { }

	ngOnInit(): void {
		this.service.ChangeBackGround(this.submit,"#7676764b")
		const local = localStorage.getItem("tk")
		this.getValuesFromToken();
		this.consultas.getAllConsultasByParam(encodeURIComponent(this.emailConsulta)).subscribe(
			data => this.agendamentos = data,
			error => console.log(error)
		)
		this.endpoints.getAllDocs().subscribe(
			data => {
				data = data.filter(er => er.crm != null)
				this.especialidades = data
			},
			err => {
				if (err.status == 401 && local != null || undefined) {
					this.alert.infoT("tempo expirado!");
					this.route.navigate(["/login"])
				} else if (err.status == 401 && local == null || undefined) {
					this.alert.infoT("necessario logar antes!");
					this.route.navigate(["/login"])
				}
			}
		);
	}

	getValuesFromToken() {
		try {
			const local = localStorage.getItem("tk")
			if (local) {
				const data = this.encodes.decodeString(local)
				if (data) {
					const index = data.indexOf(":{")
					const lastIndex = data.lastIndexOf("},")
					const user = data!.substring(index + 1, lastIndex + 1);
					const userData = JSON.parse(user);
					this.emailConsulta = userData.email;
					this.emailUser = userData.email;
					this.nomeUser = userData.nome;
					this.telefoneUser = userData.telefone;
				}
			} else {
				this.alert.infoT("necessario se logar!");
				this.route.navigate(["/login"])
			}
		} catch (error) {
			const local = localStorage.getItem("tk")
			if (local) {
				const data = this.encodes.decodeString(local)
				if (data) {
					const token = this.encodes.decodeString(data);
					const index = token!.indexOf(":{")
					const lastIndex = token!.lastIndexOf("},")
					const user = token!.substring(index + 1, lastIndex + 1);
					const userData = JSON.parse(user);
					this.emailConsulta = userData.email;
					this.emailUser = userData.email;
					this.nomeUser = userData.nome;
					this.telefoneUser = userData.telefone;
				}
			} else {
				this.alert.infoT("necessario se logar!");
				this.route.navigate(["/login"])
			}
		}
	}

	agendar(agenda: NgForm) {
		const date = agenda.value.data;
		const doc = this.doc;
		const especialidade = this.espe[0];

		const data = {
			nomeMedico: doc,
			emailMedico: this.emailMedico,
			especialidadeMedico: especialidade,
			nomeUser: this.nomeUser,
			emailUser: this.emailUser,
			telefoneUser: this.telefoneUser,
			agenda: date,
		}
		const agendas = new String(data.agenda);
		if ((agendas.trim() === "" || undefined) ||
			(data.nomeMedico == null || undefined) ||
			(data.especialidadeMedico == null || undefined)) {
			this.alert.errorT("necessario informar todos os campos!")
			return;
		}

		this.consultas.saveConsulta(data).subscribe(
			data => {
				console.log(data);
				this.alert.sucessT("consulta agendada com sucesso!")
			},
			erro => console.log(erro)
		)
	}

	selectEspecialidade(value: any) {
		this.espe = this.especialidades.filter(er => er.id == value).map(ap => ap.especialidade);
		this.medicos = this.especialidades.filter(er => er.id == value);
		this.doc = ""
	}

	selectMedico(value: any) {
		this.doc = this.medicos.filter(er => er.id == value).map(ap => ap.nome)[0];
		this.emailMedico = this.medicos.filter(er => er.id).map(ap => ap.email)[0]
		this.disabled = "false"
		this.service.ChangeBackGround(this.submit, "var(--myPurple)")
	}

	showData(value: Date) {
		const date = Date.now();
		const valor = new Date(value).getTime();
		if (valor <= new Date(date).getTime()) {
			this.alert.errorT("só é permitido selecionar uma data superior á hoje!")
		} else {
			this.selectDate = value
		}
	}

	cancelarConsulta(doc: Agenda) {
		console.log(doc.id)
		this.consultas.deleteConsulta(doc.id).subscribe(
			data => {
				this.alert.sucessT(data.message);
				console.log(data)
			},
			erro => {
				console.log(erro)
			}
		);
	}


}
