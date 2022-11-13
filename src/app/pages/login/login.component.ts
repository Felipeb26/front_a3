import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/LoginModel';
import { EndpointsService } from 'src/app/service/endpoints.service';
import { AlertsService } from 'src/app/utils/alerts.service';
import { Token } from './../../models/token.model';
import { EncodesService } from './../../utils/encodes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logo: string = "assets/img/logo.png";
  loginForm!: FormGroup
  public showPassword: boolean = false;


  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private endpoint: EndpointsService,
    private alert: AlertsService,
    private encodes: EncodesService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
      }
    );
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  submitLogin() {
    let dadosLogin = this.loginForm.getRawValue() as LoginModel;
    const { email, senha } = dadosLogin;

    if ((email == null || undefined) || (senha == null || undefined)) {
      return this.alert.errorT("ambos os campos devem ser informados!!")
    }
    this.endpoint.fazerLogin(dadosLogin).subscribe(
      (data: Token) => {
        let token = this.encodes.encodeString(data.token)
        if (token != null) {
          localStorage.setItem("tk", token)
          this.alert.sucessT("usuario logado com sucesso");
          this.router.navigate(["/"])
          return;
        } else {
          this.alert.errorT("erro ao fazer login tente em 2min")
          this.router.navigate(["login"])
          return;
        }
      },
      (error: any) => {
        console.log(error)
        this.alert.errorT(`error.statusText email ${dadosLogin.email}`)
      }
    );
  }
}
