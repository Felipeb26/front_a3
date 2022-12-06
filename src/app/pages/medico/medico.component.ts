import { RoleVerifyService } from './../../service/role.verify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { EndpointsConsultasService } from 'src/app/service/endpoints.consultas.service';
import { Agenda } from './../../models/agenda';
import { AlertsService } from './../../utils/alerts.service';
import { EncodesService } from './../../utils/encodes.service';
@Component({
	selector: 'app-medico',
	templateUrl: './medico.component.html',
	styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit {
	consultas: Agenda[] = [];

	data!: Agenda;
	displayedColumns: string[] = ["nomeUser", "emailUser", "telefoneUser", "agenda", "actions"]

	appConsulta = document.getElementsByTagName("app-consulta") as HTMLCollectionOf<HTMLElement>;
	consultaSpin = document.getElementsByClassName("consultSpin") as HTMLCollectionOf<HTMLElement>;
	consultaIcon = document.getElementsByClassName("consultIcon") as HTMLCollectionOf<HTMLElement>;

	appCalendar = document.getElementsByTagName("app-calendar") as HTMLCollectionOf<HTMLElement>;
	agendaSpin = document.getElementsByClassName("agendaSpin") as HTMLCollectionOf<HTMLElement>;
	agendaIcon = document.getElementsByClassName("agendaIcon") as HTMLCollectionOf<HTMLElement>;

	esteto = faStethoscope
	id: string = ""
	nome: string = ""
	email: string = ""
	senha: string = ""
	telefone: string = ""
	crm: string = ""
	especialidade: string = ""

	loading = false;

	constructor (
		private route: Router,
		private alert: AlertsService,
		private endpoint: EndpointsConsultasService,
		private encodes: EncodesService,
		private service:RoleVerifyService,
	) { }

	ngOnInit(): void {
		this.service.ShowAndHide(this.agendaSpin,"none");
		this.service.ShowAndHide(this.consultaSpin,"none");
		const value = this.encodes.decodeString(localStorage.getItem("tk"))
		if (value) {
			const data = this.encodes.decodeString(value)
			if (data) {
				const index = data.indexOf(":{")
				const lastIndex = data.lastIndexOf("},")
				const user = data?.substring(index + 1, lastIndex + 1);
				const userData = JSON.parse(user);

				this.id = userData.id;
				this.nome = userData.nome;
				this.email = userData.email;
				this.senha = userData.senha;
				this.telefone = userData.telefone;
				this.crm = userData.crm;
				this.especialidade = userData.especialidade;
			}
		} else {
			this.alert.infoT("necessario se logar!");
			this.route.navigate(["/login"])
		}
		for (let i = 0; i < this.appCalendar.length; i++) {
			this.appConsulta[i].style.display = "none";
			this.appCalendar[i].style.display = "flex"
		}
		const param = encodeURIComponent(this.email);
		this.endpoint.getAllConsultasByParam(param).subscribe(
			data => {
				this.consultas = data;
			},
			erro => {
				console.log(erro)
			}
		)
	}

	showConsulta() {
		this.service.ShowAndHide(this.consultaSpin, "");
		this.service.ShowAndHide(this.consultaIcon, "none");
		setTimeout(() => {
			for (let i = 0; i < this.appConsulta.length; i++) {
				if (this.appConsulta[i].style.display == "none") {
					this.appConsulta[i].style.display = "flex";
					this.appCalendar[i].style.display = "none"
				}
			}
			this.service.ShowAndHide(this.consultaSpin, "none");
			this.service.ShowAndHide(this.consultaIcon, "");
		}, 2000)
	}

	showAgenda() {
		this.loading = true;
		this.service.ShowAndHide(this.agendaSpin, "");
		this.service.ShowAndHide(this.agendaIcon, "none");
		setTimeout(() => {
			for (let i = 0; i < this.appConsulta.length; i++) {
				if (this.appCalendar[i].style.display == "none") {
					this.appConsulta[i].style.display = "none";
					this.appCalendar[i].style.display = "flex"
				}
			}
			this.service.ShowAndHide(this.agendaSpin, "none");
			this.service.ShowAndHide(this.agendaIcon, "");
		}, 2000)
	}

}
