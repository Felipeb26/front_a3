import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { EndpointsService } from 'src/app/service/endpoints.service';
import { AlertsService } from './../../utils/alerts.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  //icons
  faLinkedin = faLinkedin
  faFacebook = faFacebook
  faGithub = faGithub
  faMail = faEnvelope

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  constructor (
    private endpoints: EndpointsService,
    private alert: AlertsService) { }

  ngOnInit(): void {
  }

  sendMail(mail: { assunto: string, mensagem: string }) {
    const toSend = {
      "para": "felipeb2silva@gmail.com",
      "assunto": mail.assunto,
      "mensagem": mail.mensagem,
      "modelo": "atestado"
    }

    this.endpoints.enviarEmail(toSend).subscribe(
      (data: any) => {
        this.alert.sucessT(data.message)
      },
      (erro: any) => {
        console.log(erro)
      }
    )
  }

  mostrarRedes(value: any) {
    const type = value.iconName;
    this.alert.contatoModal(type);
  }

}
