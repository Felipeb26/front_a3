import { CacheResolveService } from './../cache.resolve.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable,of, tap } from 'rxjs';

const TIME_TO_LIVE = 1000;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheResolve:CacheResolveService) {}

  intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler):
      Observable<HttpEvent<unknown>> {

    if(request.method !== "GET"){
      return next.handle(request);
    }

    if(request.headers.get("x-refresh")){
      return this.sendRequest(request, next);
    }


    const cachedResponse = this.cacheResolve.get(request.url);
    return cachedResponse ? of(cachedResponse) :this.sendRequest(request, next);
  }

  sendRequest(
    request: HttpRequest<any>,
    next: HttpHandler): 
    Observable<HttpEvent<any>> {
    
      return next.handle(request).pipe(
      tap((event) => {
        if(event instanceof HttpResponse){
          this.cacheResolve.set(request.url, event, TIME_TO_LIVE)
        }
      })
    )

  }
}
