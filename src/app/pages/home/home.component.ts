import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EndpointsService } from 'src/app/service/endpoints.service';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	encapsulation: ViewEncapsulation.None,

})
export class HomeComponent implements OnInit {

	img1: string = "assets/img/carrossel1.png"
	img2: string = "assets/img/carrossel2.png"
	img3: string = "assets/img/carrossel3.png"

	doctor: string = "assets/img/doctor.jpg"

	constructor (
	) { }

	ngOnInit(): void {
	}

}
