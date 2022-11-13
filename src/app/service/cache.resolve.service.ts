import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheResolveService {

  constructor () { }

  private cache = new Map<string, [Date, HttpResponse<any>]>();

  set(key: any, value: any, timeToLive: number | null = null) {
    console.log(`set cache key ${key} `);

    if(timeToLive){
      const expiresIn = new Date();
      expiresIn.setSeconds(expiresIn.getSeconds()+timeToLive);
      this.cache.set(key, [expiresIn, value]);
    }else{
      this.cache.set(key, [new Date(0), value]);
    }
  }

  get(key: any){
    const tuple = this.cache.get(key);
    if(!tuple) return null

    const expiresIn = tuple[0];
    const savedResponse= tuple[1];
    const now = new Date();

    if(expiresIn && expiresIn.getTime() < now.getTime()){
      this.cache.delete(key);
      return null;
    }
    
    return savedResponse;
  }

}
