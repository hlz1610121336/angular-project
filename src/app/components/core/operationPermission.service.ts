import {Component, OnInit, Injectable} from '@angular/core';
import {Router} from '@angular/router';   //使用路由
import {InterceptorService} from 'ng2-interceptors';
import {LocalStorageService} from '../../app-localstorage.service';
import {constService} from './const.service';
import {toPromise} from 'rxjs/operator/toPromise';
import {Headers} from '@angular/http';

@Injectable()
export class operationPermissionService {
  constructor(private http: InterceptorService,
              private router: Router,
              private localStorage: LocalStorageService,
              private consts: constService) {
  }

  public data: any = {};
  private operationPermissionUrl = this.consts.baseUrl + '/api/Verification/QueryUserObjectOperationPermission';
  private getAllOperationsUrl = this.consts.baseUrl + '/api/StaticData/QueryOperations';
  private getAllObjectOperationUrl = this.consts.baseUrl + '/api/CommonData/QueryAllOperationObjects';
  public headers: any = new Headers({
    'Content-Type': 'application/json',
    'token': this.localStorage.getItem('token')
  });
  //对象操作
  private objectPermissionOperations: any = {};

  //获取用户可以看到的菜单
  public getPermissionMenu(): any {
    return this.getAllPermissions().then(res => {
      return res;
    });
  }

  //获取某菜单下用户所有的操作权限
  public getObjectPermissions(currentMenu: string): any {
    //第一步 获取对象的操作权限
    return this.getAllPermissions().then(peres => {
      for (let item of peres) {
        if (item.ObjectCode == currentMenu) {
          return item;
        }
      }
    }).then(aa => {
      //第二步 获取所有的操作
      return this.getAllOperations().then(res => {
        for (let item in  res) {
          let opValue: number = aa.Operation;
          let itemValue: number = parseInt(item);
          if ((opValue & itemValue) == itemValue) {
            this.objectPermissionOperations[item] = res[item];
          }
        }
        return this.objectPermissionOperations;
      });
    });
  }

  //获取所有的操作
  public getAllOperations(): any {
    return this.http.get(this.getAllOperationsUrl, {headers: this.consts.getHeaders()}).toPromise().then(res => {
      let resOperations = res.json().Data;
      if (res.status == 200 && res.json().Status == true) {
        return resOperations;
      }
      else {
        alert(res.json().Message);
        return null;
      }
    });
  }

  //获取所有的权限
  public getAllPermissions(): any {
    return this.http.get(this.operationPermissionUrl, {headers: this.headers}).toPromise().then(res => {
      let respermissions = res.json().Data;
      if (res.status == 200 && res.json().Status == true) {
        return respermissions;
      }
      else {
        alert(res.json().Message);
        return null;
      }
    });
  }

  //获取所有的对象
  public getAllOperationObjects(): any {
    return this.http.get(this.getAllObjectOperationUrl, {headers: this.consts.getHeaders()}).toPromise().then(res => {
      let objects = res.json().Data;
      if (res.status == 200 && res.json().Status == true) {
        return objects;
      } else {
        alert(res.json().Message);
        return null;
      }
    });
  }

  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error); // for demo purposes only
    alert(error.json().Message);
    //alert(error.json().Message);
    return Promise.reject(error.json().Message || error);
  }

}
