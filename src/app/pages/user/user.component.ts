import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { decode } from 'js-base64';
import { EncodesService } from 'src/app/utils/encodes.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  form = document.getElementsByTagName("mat-form-field") as HTMLCollectionOf<HTMLElement>;
  input = document.getElementsByTagName("input") as HTMLCollectionOf<HTMLElement>;
  check: string = "disabled"
  checks: boolean = true
  id: string = ""
  nome: string = ""
  email: string = ""
  senha: string = ""
  telefone: string = ""
  crm: string = ""
  especialidade: string = ""

  showPassword: boolean = false

  constructor (
    private encodes: EncodesService) { }


  ngOnInit(): void {
    const value = this.encodes.decodeString(localStorage.getItem("tk"))

    if (value) {
      const data = this.encodes.decodeString(value)
      if (data) {
        const index = data.indexOf(":{")
        const lastIndex = data.lastIndexOf("},")
        const user = data?.substring(index + 1, lastIndex + 1);
        const userData = JSON.parse(user);

        this.id = userData.id;
        this.nome = userData.nome.toUpperCase();
        this.email = userData.email;
        this.senha = userData.senha;
        this.telefone = userData.telefone;
      }
    }
  }

  enableInputs() {
    if (this.check.startsWith("disabled")) {
      for (let i = 0; i < this.form.length; i++) {
        this.form[i].style.boxShadow = "0 -1.75rem 0.5rem -0.8rem var(--myPurple) inset";
        this.input[i].style.textDecoration = "none";
        this.checks = false
      }
      this.check = "false"
    } else {
      for (let i = 0; i < this.form.length; i++) {
        this.form[i].style.boxShadow = "inset 0 0 5rem var(--myPurple)";
        this.input[i].style.textDecoration = "underline var(--myLogo)";
        this.checks = true
      }
      this.check = "disabled";
    }
  }

  togglePass(): void {
    this.showPassword = !this.showPassword;
  }

  atualizar(usuario: NgForm) {

    const { nome, email, senha, telefone, crm, especialidade } = usuario.value;

    const user = {
      nome: nome ? nome : this.nome,
      email: email ? email : this.email,
      semha: senha ? senha : this.senha,
      telefone: telefone ? telefone : this.telefone,
    }

    const medico = {
      nome: nome ? nome : this.nome,
      email: email ? email : this.email,
      semha: senha ? senha : this.senha,
      telefone: telefone ? telefone : this.telefone,
      especialidade: especialidade ? especialidade : this.especialidade,
      crm: crm ? crm : this.crm
    }

    let update = null;
    if (crm === null || crm === undefined) {
      update = user
    } else {
      update = medico
    }

    console.log(this.id)
  }
}
