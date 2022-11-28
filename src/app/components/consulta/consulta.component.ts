import { ModalActionsComponent } from './../modal.actions/modal.actions.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Agenda } from './../../models/agenda';

@Component({
	selector: 'app-consulta',
	templateUrl: './consulta.component.html',
	styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit{
	@Input("data") content: Agenda[] = []
	@ViewChild(MatTable) table!: MatTable<Agenda>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	dataSource!: MatTableDataSource<Agenda>;
	displayedColumns: string[] = ["nomeUser", "emailUser", "telefoneUser", "agenda", "actions"]

	constructor (
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			this.dataSource = new MatTableDataSource(this.content);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		}, 1500)
	}

	sortElements(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	makeAction(id:string,type:string){
		this.dialog.open(ModalActionsComponent,{
			data: {id:id, type:type,table:this.table}
		})
	}
}
