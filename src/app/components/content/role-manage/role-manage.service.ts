import {Injectable} from '@angular/core';
import {InterceptorService} from 'ng2-interceptors';
import {Router} from '@angular/router';

import {constService} from '../../core/const.service';


@Injectable()
export class RoleManageService {

  constructor(private http: InterceptorService,
              private  constService: constService,
              private router: Router) {
  }

  private baseUrl = this.constService.baseUrl;
  private headers = this.constService.getHeaders();
  private queryListUrl: string = this.baseUrl + '/api/Role/QueryRole';
  private deleteOneUrl = this.baseUrl + '/api/Role/DeleteRole/';
  private roleManageAddUrl = this.baseUrl + '/api/Role/AddRole';
  private roleManageUpdateUrl = this.baseUrl + '/api/Role/UpdateRole';
  private getOwnedMemberUrl = this.baseUrl + '/api/Role/GetOwnedMembers';
  private getNotOwnedMemberUrl = this.baseUrl + '/api/Role/GetNotOwnedMembers';
  private saveConfigMemberUrl = this.baseUrl + '/api/Role/SetOwnedMembers';
  private saveConfigPermissionUrl = this.baseUrl + '/api/Role/SetRolePermissions';
  private queryRoleObjectOperationPermissionUrl = this.baseUrl + '/api/Role/QueryRoleObjectOperationPermission';

  public data: any;
  private roleId: number = null;

  //获取列表
  public getListData(body: any): any {
    return this.http.get(this.queryListUrl, {headers: this.headers, params: body}).toPromise().then(res => {
      this.data = res.json().Data;
      if (res.status == 200 && res.json().Status == true) {
        return res.json().Data;
      } else {
        alert(res.json().Message);
      }
    }).catch(this.handleError);
  }

  //单条删除
  public deleteOne(id: any): any {
    return this.http.delete(this.deleteOneUrl + id, {headers: this.headers, params: id}).toPromise().then(res => {
      if (res.status == 200 && res.json().Status == true) {
      } else {
        alert(res.json().Message);
      }
    }).catch(this.handleError);
  }

  //单条保存
  public saveOneData(item: any): void {
    if (item.Id > 0)
      this.save(this.roleManageUpdateUrl, item).then().catch(this.handleError);
    else
      this.save(this.roleManageAddUrl, item).then().catch(this.handleError);
  }

  //获取已配置成员
  public getOwnedMembers(id: any): any {
    return this.http.get(this.getOwnedMemberUrl, {headers: this.headers, params: {roleId: id}}).toPromise().then(res => {
      if (res.status == 200 && res.json().Status == true) {
        return res.json().Data;
      } else {
        alert(res.json().Message);
      }
    }).catch(this.handleError);
  }

  //获取未配置成员
  public getNotOwnedMembers(id: any): any {
    return this.http.get(this.getNotOwnedMemberUrl, {headers: this.headers, params: {roleId: id}}).toPromise().then(res => {
      if (res.status == 200 && res.json().Status == true) {
        return res.json().Data;
      } else {
        alert(res.json().Message);
      }
    }).catch(this.handleError);
  }

  //保存配置成员
  public saveConfigMembers(id: number, memberIds: number[]): any {
    return this.http.put(this.saveConfigMemberUrl, id, {
      headers: this.headers,
      params: {roleId: id, docIds: memberIds}
    }).toPromise().then(res => {
      if (res.status == 200 && res.json().Status == true) {
      } else {
        alert(res.json().Message);
      }
    }).catch(this.handleError);
  }

  //保存配置的权限
  public saveConfigPermissions(configs: any): any {
    console.log(this.headers);
    return this.http.put(this.saveConfigPermissionUrl, configs, {
      headers: this.headers,
      // params: {objectOperationPermissions: configs}
    }).toPromise().then(res => {
      if (res.status == 200 && res.json().Status == true) {
      } else {
        alert(res.json().Message);
      }
    }).catch(this.handleError);
  }

  //获取角色的权限
  public getRoleObjectOperationPermission(roleId: number): any {
    return this.http.get(this.queryRoleObjectOperationPermissionUrl, {
      headers: this.headers,
      params: {roleId: roleId}
    }).toPromise().then(res => {
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

  private save(url: string, body: any): any {
    return this.http.post(url, body, {headers: this.headers}).toPromise().then(res => {
      if (res.status == 200 && res.json().Status == true) {
        this.router.navigate(['/index/roleManage']);
      } else {
        alert(res.json().Message);
      }
    }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error); // for demo purposes only
    alert(error.json().Message);
    //alert(error.json().Message);
    return Promise.reject(error.json().Message || error);
  }
}
