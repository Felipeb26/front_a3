import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndpointsService } from 'src/app/service/endpoints.service';
import { Endpoints2Service } from 'src/app/service/endpoints2.service';
import { AlertsService } from 'src/app/utils/alerts.service';
import { USER } from './../../models/usuario.model';

@Component({
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
	user: string = "Paciente"
	disable_crm: string = "disable"
	expand: string = "expand_more"
	check: string = "disabled"
	CadastroForm!: FormGroup;
	showPassword: boolean = false;
	role: number = 0

	crmInput($event: any) {
		const isCheck = $event.checked;
		if (isCheck) {
			this.user = "Médico"
			this.disable_crm = "false"
			this.check = "false"
		} else {
			this.user = "Paciente"
			this.disable_crm = "disable"
			this.check = "disabled"
		}
	}

	constructor (
		private formBuilder: FormBuilder,
		private endpoints: EndpointsService,
		private endpoint2: Endpoints2Service,
		private route: Router,
		private alert: AlertsService) { }

	ngOnInit(): void {
		this.CadastroForm = this.formBuilder.group(
			{
				email: ['', [Validators.required, Validators.email]],
				senha: ['', [Validators.required]]
			}
		);
	}


	panelOpenState() {
		const exp = this.expand;
		if (exp.endsWith("less")) {
			this.expand = "expand_more"
		} else {
			this.expand = "expand_less"
		}
	}

	togglePasswordVisibility(): void {
		this.showPassword = !this.showPassword;
	}

	cadastrar(usuario: { nome: string, email: string, telefone: string, senha: string, especialidade: string, crm: string }) {

		if (usuario.crm == null || undefined) {
			this.role = 2
		} else if (usuario.email.includes("origami.com")) {
			this.role = 0;
		} else {
			this.role = 1
		}

		const user = {
			"nome": usuario.nome,
			"telefone": usuario.telefone,
			"email": usuario.email,
			"senha": usuario.senha,
			"role": this.role
		}

		const doctor = {
			"nome": usuario.nome,
			"telefone": usuario.telefone,
			"email": usuario.email,
			"senha": usuario.senha,
			"crm": usuario.crm,
			"especialidade": usuario.especialidade,
			"role": this.role
		}

		let save = user;
		if (usuario.crm != "" || usuario.crm != undefined) {
			save = doctor;
		}

		this.endpoints.salvarUsuario(save).subscribe(
			(result: USER) => {

				if (result.crm != null || undefined) {
					const mail = {
						"user": result.nome,
						"para": result.email,
						"modelo": "bemvindo_user"
					}
					this.endpoint2.enviarEmail(mail);
				} else {
					const mail = {
						"user": result.nome,
						"para": result.email,
						"modelo": "bemvindo_doc"
					}
					this.endpoint2.enviarEmail(mail).subscribe(
						data => console.log(data),
						erro => console.log(erro)
					);
				}
				setTimeout(() => {
					this.route.navigate([""]);
					this.alert.sucessT(`Usuario ${result.nome} cadastrado!`)
				}, 2500)
			},
			(error: any) => {
				let err = error.error;
				err = err.toString().replace("[", "");
				err = err.toString().replace("]", "");
				err = err.toString().replace(",", "\n");
				this.alert.errorT(err)
				const er = error.error.errorList;
				if (er != null || undefined) {
					let erro = new String(er);
					erro = erro.replace("[", "")
					erro = erro.replace("]", "")
					this.alert.errorT(erro)
				}
			}
		)

	}
}
