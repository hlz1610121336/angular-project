import { Injectable } from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { constService } from './components/core/const.service';
import { LocalStorageService } from './app-localstorage.service';
import { stringify } from '@angular/core/src/render3/util';

import * as _ from 'lodash'; //引入lodash.js
@Injectable()
export class StaticDataService {

  constructor(
    private http:InterceptorService,
    private consts:constService,
    private localStorage:LocalStorageService
  ) { }

  private operationsDataUrl:string = this.consts.baseUrl + '/api/StaticData/QueryOperations';
  private paymentsDataUrl:string = this.consts.baseUrl + '/api/StaticData/QueryPayments';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'token': this.localStorage.getItem('token')
  });
  private handleError(error: any): Promise<any> {
    alert(error.json().Message);
    return Promise.reject(error.json().Message || error);
  }

  private getOperationsData(headers:any){
    return this.http.get(this.operationsDataUrl,{headers:headers}).toPromise().then(res =>{
      if (res.status == 200 && res.json().Status == true) {
        return  res.json();
    } else {
      alert(res.json().Message);
    }
    }).catch(this.handleError);
  }
  private getPaymentsData(headers:any){
    return this.http.get(this.paymentsDataUrl,{headers:headers}).toPromise().then(res =>{
      if (res.status == 200 && res.json().Status == true) {
        return  res.json();
    } else {
      alert(res.json().Message);
    }
    }).catch(this.handleError);
  }
  getStaticData(headers:any){
    return {
      Operations:this.getOperationsData(headers),
      Payments:this.getPaymentsData(headers),
    }
  }

}
