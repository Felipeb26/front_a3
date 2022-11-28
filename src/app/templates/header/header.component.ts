import { RoleVerifyService } from './../../service/role.verify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { Token } from 'src/app/models/token.model';
import { EndpointsService } from 'src/app/service/endpoints.service';
import { AlertsService } from 'src/app/utils/alerts.service';
import Swal from 'sweetalert2';
import { EncodesService } from './../../utils/encodes.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	medicoIcon = document.getElementsByClassName("medico") as HTMLCollectionOf<HTMLElement>;

	esteto = faStethoscope
	logo: string = "assets/img/logo.png"
	open: boolean = false
	mode: string = "light_mode"
	email: string = ""
	senha: string = ""

	constructor (
		private alert: AlertsService,
		private encodes: EncodesService,
		private endpoint: EndpointsService,
		private roles:RoleVerifyService,
		private route: Router
	) { }

	ngOnInit(): void {
		const mode = localStorage.getItem("mode")
		if (mode != null || undefined) {
			if (mode?.startsWith("dark")) {
				document.body.classList.toggle("dark-theme");
				this.mode = "dark_mode"
			}
		}
		this.showDialog()
		this.roles.showIcon()
			.then(en => {
				if(en == "false"){
					this.roles.ShowAndHide(this.medicoIcon,"none");
				}else{
					this.roles.ShowAndHide(this.medicoIcon, "");
				}
			})
	}

	logout() {
		const local = localStorage.getItem("tk");
		if (local != null || local != undefined) {
			localStorage.removeItem("tk");
			localStorage.removeItem("is");
			this.alert.sucessT("usuario deslogado com sucesso!")
		} else {
			this.alert.infoT("sem usuario logado!")
		}
	}

	public themeMode() {
		const theme = document.body.classList.toggle("dark-theme");

		if (theme) {
			localStorage.setItem("mode", "light")
			return this.mode = "light_mode"
		}
		localStorage.setItem("mode", "dark");
		return this.mode = "dark_mode"
	}

	showDialog() {
		const local = localStorage.getItem("tk");
		if(local != undefined || null){
			setInterval(() => {
				Swal.fire({
					text: "CONTINUAR LOGADO?",
					allowEscapeKey: false,
					allowOutsideClick: false,
					confirmButtonColor: "cyan",
					confirmButtonText: "continuar",
					showConfirmButton: true,
					denyButtonColor: "não",
					showDenyButton: true,
					timerProgressBar: true,
					timer: 15000,
				}).then(data => {
					if (data.isConfirmed) {
						this.manterLogin();
					} else {
						localStorage.clear();
						this.alert.infoT("usuario deslogado")
						this.route.navigate(["/login"])
					}
				}).catch(() => this.alert.errorT("necessario logar"))
			}, 100 * 9000)
		}
	}

	manterLogin() {
		const value = this.encodes.decodeString(localStorage.getItem("tk"))
		if (value) {
			const data = this.encodes.decodeString(value)
			if (data) {
				const index = data.indexOf(":{")
				const lastIndex = data.lastIndexOf("},")
				const user = data?.substring(index + 1, lastIndex + 1);
				const userData = JSON.parse(user);
				this.email = userData.email;
				this.senha = userData.senha;
				const login = { email: this.email, senha: this.senha }
				this.endpoint.fazerLogin(login).subscribe(
					(data: Token) => {
						let token: string | null = this.encodes.encodeString(data.token)
						this.encodes.sleep(1500);
						if (token != null || token!.length > 0) {
							localStorage.setItem("tk", token!)
							this.alert.sucessT("usuario logado com sucesso");
							return;
						} else {
							this.alert.errorT("erro ao fazer login tente em 2min")
							return;
						}
					},
					(error: any) => {
						console.log(error)
					}
				);
			}
		}
	}

}
