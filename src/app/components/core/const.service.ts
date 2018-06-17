import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Headers} from '@angular/http';
import {LocalStorageService} from '../../app-localstorage.service';


/*
* 作为常量管理
* */
@Injectable()
export class constService {
  constructor(private localStorage: LocalStorageService,) {
  }

  //请求api的baseUrl
  public baseUrl: string = 'http://dpapi.jiewit.com';

  //headers
  public getHeaders():Headers{
    return new Headers({
      'Content-Type': 'application/json',
      'token': this.localStorage.getItem('token')
    });
  };
}


