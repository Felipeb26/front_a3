import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-notfound',
	templateUrl: './notfound.component.html',
	styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

	img: string = "assets/img/not-found.jpeg"

	constructor () { }

	ngOnInit(): void {
	}

}
