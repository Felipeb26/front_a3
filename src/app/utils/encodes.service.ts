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

	httpStatus(status: any) {
		if (status == '200') return 'OK';
		if (status == '201') return 'Created';
		if (status == '202') return 'Accepted';
		if (status == '203') return 'Non-Authoritative Information';
		if (status == '204') return 'No Content';
		if (status == '205') return 'Reset Content';
		if (status == '206') return 'Partial Content';
		if (status == '300') return 'Multiple Choices';
		if (status == '301') return 'Moved Permanently';
		if (status == '302') return 'Found';
		if (status == '303') return 'See Other';
		if (status == '304') return 'Not Modified';
		if (status == '305') return 'Use Proxy';
		if (status == '306') return 'Unused';
		if (status == '307') return 'Temporary Redirect';
		if (status == '400') return 'Bad Request';
		if (status == '401') return 'Unauthorized';
		if (status == '402') return 'Payment Required';
		if (status == '403') return 'Forbidden';
		if (status == '404') return 'Not Found';
		if (status == '405') return 'Method Not Allowed';
		if (status == '406') return 'Not Acceptable';
		if (status == '407') return 'Proxy Authentication Required';
		if (status == '408') return 'Request Timeout';
		if (status == '409') return 'Conflict';
		if (status == '410') return 'Gone';
		if (status == '411') return 'Length Required'
		if (status == '412') return 'Precondition Required';
		if (status == '413') return 'Request Entry Too Large';
		if (status == '414') return 'Request-URI Too Long';
		if (status == '415') return 'Unsupported Media Type';
		if (status == '416') return 'Requested Range Not Satisfiable';
		if (status == '417') return 'Expectation Failed';
		if (status == '418') return 'I\'m a teapot';
		if (status == '500') return 'Internal Server Error';
		if (status == '501') return 'Not Implemented';
		if (status == '502') return 'Bad Gateway';
		if (status == '503') return 'Service Unavailable';
		if (status == '504') return 'Gateway Timeout';
		if (status == '505') return 'HTTP Version Not Supported';
		else return;
	}

}
