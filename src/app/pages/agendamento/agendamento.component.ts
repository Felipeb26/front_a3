import { Router } from '@angular/router';
import { AlertsService } from './../../utils/alerts.service';
import { EncodesService } from './../../utils/encodes.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { USER } from 'src/app/models/usuario.model';
import { EndpointsService } from 'src/app/service/endpoints.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  local:any=localStorage.getItem("tk")
  today: any = Date.now().toLocaleString()
  especialidade: string = ""
  especialidades: USER[] = []
  medicos: USER[] = []

  id: string = ""
  nome: string = ""
  medico: string = ""
  especial: string = ""
  data: any

  selectDate: any
  doc: any = ""
  espe: any = ""

  constructor (
    private endpoints: EndpointsService,
    private encodes: EncodesService,
    private alert:AlertsService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.decodeToken()
    this.endpoints.getAllDocs().subscribe(
      data => {
        console.log(data)
        data = data.filter(er => er.crm != null)
        this.especialidades = data
      },
      err => {
        if(err.status == 401 && this.local != null || undefined){
          this.alert.infoT("tempo expirado!");
        }else if (err.status==401 && this.local== null || undefined){
          this.alert.infoT("tempo expirado!");
          this.route.navigate(["/login"])
        }

        console.log(err)
      }
    );
  }


  agendar(agenda: NgForm) {
    const date = agenda.value.data
    const doc = this.doc
    const especialidade = this.espe

    const data = {
      idUser: this.id,
      agenda: date,
      medico: doc,
      especialidade: especialidade
    }

    console.table(data)
  }

  decodeToken() {
    const value = this.encodes.decodeString(this.local)

    if (value) {
      const data = this.encodes.decodeString(value)
      if (data) {
        const index = data.indexOf(":{")
        const lastIndex = data.lastIndexOf("},")
        const user = data?.substring(index + 1, lastIndex + 1);
        const userData = JSON.parse(user);

        this.id = userData.id;
        this.nome = userData.nome.toUpperCase();
      }
    }
  }

  selectEspecialidade(value: any) {
    this.espe = this.especialidades.filter(er => er.id == value).map(ap => ap.especialidade);
    this.medicos = this.especialidades.filter(er => er.id == value);
    this.doc = ""
  }

  selectMedico(value: any) {
    this.doc = this.medicos.filter(er => er.id == value).map(ap => ap.nome);
  }

  showData(value: Date) {
    this.selectDate = value
  }

}
