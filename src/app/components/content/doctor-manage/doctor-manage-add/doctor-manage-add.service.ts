import { Injectable } from '@angular/core';
import { DoctorManageModel } from '../doctor-manage-model';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Injectable()
export class DoctorManageAddService {

  constructor(private http:Http,private router:Router){}
  
   save(url:string,body:any,headers:any){
    return this.http.post(url,body,{headers:headers}).toPromise().then(res => {
      if (res.status == 200 && res.json().Status == true){
        this.router.navigate(['/index/doctorManage']); 
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
