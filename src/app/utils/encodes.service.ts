import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
import { AlertsService } from 'src/app/utils/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class EncodesService {

  constructor (private alert: AlertsService) { }

  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  encodeString(chave: string) {
    if (chave != null) {
      let code = Base64.encode(chave);
      return code;
    }
    return null;
  }

  decodeString(chave: any) {
    if (chave != null) {
      let code = Base64.decode(chave);
      return code;
    } else {
      return null;
    }
  }
}
