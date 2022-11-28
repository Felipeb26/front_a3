import { RoleVerifyService } from 'src/app/service/role.verify.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import eng from "@fullcalendar/core/locales/en-gb";
import ptBr from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Agenda } from './../../models/agenda';
import { ModalPopupComponent } from './../modal.popup/modal.popup.component';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

	@Input("data") content: Agenda[] = []
	event: any[] = []

	options: CalendarOptions = {
		plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
		locales: [ptBr, eng],
		initialView: 'dayGridMonth',
		headerToolbar: {
			right: "prev,next today",
			center: "title",
			left: "listWeek,timeGridWeek,dayGridMonth"
		},
		navLinks: true,
		editable: false,
		selectable: true,
		weekends: true,
		eventClick: this.handleClick.bind(this),
	}

	constructor (
		public dialog: MatDialog,
		private service:RoleVerifyService
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			if (this.content.length > 0) {
				this.contentToEvent();
				this.toProperEvent();
			}
		}, 2500)
	}

	toProperEvent() {
		const eventos: any[] = [];
		this.event.forEach(it => {
			const events = {
				title: it.nomeUser,
				date: it.agenda,
				description: it.id,
				color: this.service.prioridadeColor(it.prioridade),
				backgroundColor: it.prioridade
			}
			eventos.push(events)
		});
		this.options.eventSources = [eventos, this.event];
	}

	contentToEvent() {
		this.content.map(it => {
			const data = it.agenda.split(" ")[1];
			it.agenda = this.FormataStringData(it.agenda.split(" ")[0])
			it.agenda = it.agenda + "T" + data;
			if (it.agenda == undefined) {
				it.agenda = Date.now();
			}
			const agenda = {
				id: it.id,
				nomeMedico: it.nomeMedico,
				emailMedico: it.emailMedico,
				nomeUser: it.nomeUser,
				emailUser: it.emailUser,
				telefoneUser: it.telefoneUser,
				agenda: it.agenda,
				prioridade: it.prioridade
			}
			this.event.push(agenda);
		});
	}

	FormataStringData(data: string) {
		var dia = data.split("/")[0];
		var mes = data.split("/")[1];
		var ano = data.split("/")[2];
		return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
	}

	handleClick(args: any) {
		const def = args.event._def;
		const dialogRef = this.dialog.open(ModalPopupComponent, {
			data: def.extendedProps.description
		});
	}
}
