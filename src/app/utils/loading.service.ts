import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadSub = new BehaviorSubject<boolean>(false)

  loading$: Observable<boolean> = this.loadSub.asObservable();

  hide(): void{
    this.loadSub.next(false);
  }

  show():void{
    this.loadSub.next(true);
  }
}
