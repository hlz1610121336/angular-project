import { Injectable } from '@angular/core';
import { DoctorManageModel } from './doctor-manage-model';
import { PaginationService } from '../shered-service/pagination.service';
import { Http } from '@angular/http';
import { InterceptorService  } from 'ng2-interceptors';

@Injectable()
export class DoctorManageService {

  constructor(private http:InterceptorService){}
  public data:any;

   getData(url:string,body:any,headers:any){
    return this.http.get(url,{headers:headers,params:body}).toPromise().then(res => {
      this.data = res.json().Data;
      if (res.status == 200 && res.json().Status == true) {
          return  res.json().Data;
      } else {
        alert(res.json().Message);
      }
     }).catch(this.handleError);
   }
   search(url:string,code:string,headers:any){
      return this.http.get(url,{headers:headers,params:code}).toPromise().then(res =>{
        if (res.status == 200 && res.json().Status == true){
          return res.json().Data
        }else{
          alert(res.json().Message);
        }
       }).catch(this.handleError)
   }
   delete(url:string,id:any,headers:any,getUrl:string){
     return this.http.delete(url+id,{headers:headers,params:id}).toPromise().then(res =>{
      if (res.status == 200 && res.json().Status == true){

      }else{
        alert(res.json().Message);
      }
     }).catch(this.handleError)
   }
   resetPassword(url:string,id:any,headers:any){
    return this.http.put(url,id,{headers:headers,params:id}).toPromise().then(res => {
      if (res.status == 200 && res.json().Status == true){
        return res.json().Data
      }else{
        alert(res.json().Message);
      }
    }).catch(this.handleError)
   }
   private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error); // for demo purposes only
    alert(error.json().Message);
    //alert(error.json().Message);
    return Promise.reject(error.json().Message || error);
  }
}
