import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    setItem (key:string,value:string){
        return localStorage.setItem(key,value);
    }
    getItem (key:string) {
        return localStorage.getItem(key);
    }
    removeItem (key:string){
        return localStorage.removeItem(key);
    }
}