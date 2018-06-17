import { Injectable } from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { constService } from './components/core/const.service';
import { LocalStorageService } from './app-localstorage.service';
@Injectable()
export class CommonDataService {

  constructor(
    private http:InterceptorService,
    private consts:constService,
    private localStorage:LocalStorageService
  ) { }

  private commonDataUrl:string = this.consts.baseUrl + '/api/CommonData/QueryAllOperationObjects';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'token': this.localStorage.getItem('token')
  });
  private handleError(error: any): Promise<any> {
    alert(error.json().Message);
    return Promise.reject(error.json().Message || error);
  }

  getCommonData(headers:any=this.headers,params:any){
    return this.http.get(this.commonDataUrl,{headers:headers,params:params}).toPromise().then(res =>{
      if (res.status == 200 && res.json().Status == true) {
        return  res.json().Data;
    } else {
      alert(res.json().Message);
    }
    }).catch(this.handleError);
  }
}
