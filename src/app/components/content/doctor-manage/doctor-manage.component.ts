import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Http, Headers} from '@angular/http';
import {DoctorManageModel} from './doctor-manage-model';
import {DoctorManageService} from './doctor-manage.service';
import {WindowHeightInitService} from '../shered-service/windowHeightInit.service';
import {LocalStorageService} from '../../../app-localstorage.service';
import {CommonDataService} from '../../../common-data.service';
import {StaticDataService} from '../../../static-data.service';
import {operationPermissionService} from '../../core/operationPermission.service';


//\\拖拽
import {DragulaService} from 'ng2-dragula';

//分页
/////////////////////////////////////////////////////////////////////////////
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import {InterceptorService} from 'ng2-interceptors';
import {constService} from '../../core/const.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
///////////////////////////////////////////////////////////////////////////////

import * as _ from 'lodash'; //引入lodash.js
import {window} from 'rxjs/operator/window';
@Component({
  selector: 'doctor-manage',
  templateUrl: './doctor-manage.component.html',
  styleUrls: ['./doctor-manage.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,/////////
  providers: [
    DoctorManageService,
    WindowHeightInitService,
    DoctorManageModel,
    LocalStorageService,
    DragulaService,
    CommonDataService,
    StaticDataService,
    operationPermissionService
  ]
})
export class DoctorManageComponent implements OnInit {

  constructor(private doctorManageService: DoctorManageService,
              private windowHeight: WindowHeightInitService,
              private http: InterceptorService,
              private localStorage: LocalStorageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private consts: constService,
              private dragulaService: DragulaService,//拖拽
              private commonData: CommonDataService,
              private staticData: StaticDataService,
              private operationPermission: operationPermissionService) {
    dragulaService.drag.subscribe(value => {
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });
  }

  public items: DoctorManageModel[];
  private doctorMangaeUrl = this.consts.baseUrl + '/api/Doctor/QueryDoctor';
  private doctorManageDeleteUrl = this.consts.baseUrl + '/api/Doctor/DeleteDoctor/';
  private doctorQueryUrl = this.consts.baseUrl + "/api/Doctor/QueryDoctorByCode";
  private doctorResetPasswordUrl = this.consts.baseUrl + "/api/Doctor/ResetPassword";
  private doctorOwnedRolesUrl = this.consts.baseUrl + "/api/Doctor/GetDoctorOwnedRoles";
  private doctorNotOwnedRolesUrl = this.consts.baseUrl + "/api/Doctor/GetDoctorNotOwnedRoles";
  private setDoctorOwnedRolesUrl = this.consts.baseUrl + "/api/Doctor/SetDoctorOwnedRoles";
  private headers = new Headers({
    'Content-Type': 'application/json',
    'token': this.localStorage.getItem('token')
  });
  public pagination: any = {
    PageSize: 10,
    PageIndex: 1,
    DataCount: '',
    IsPaging: true,
    PageCount: ''
  }
  public httpQuery: any = {
    code: '',
    name: '',
    cellPhone: '',
    email: '',
    "pagination.pageSize": this.pagination.PageSize,
    "pagination.pageIndex": this.pagination.PageIndex,
    "pagination.dataCount": this.pagination.DataCount,
    "pagination.isPaging": this.pagination.IsPaging,
    "pagination.pageCount": this.pagination.PageCount
  }
  public allCheck: boolean = false;
  public isCollapse: boolean = true;
  public commonDatas: any;
  public staticDatas: any;
  public operationPermissionMap: any;

  ngOnInit() {
    //初始化系统height
    this.windowHeight.onInit();
    this.onSearch();
    this.getPage(1); //////////////用作分页
    this.commonData.getCommonData(this.headers, {}).then(res => {
      this.commonDatas = res;
    }).catch(this.handleError);
    this.operationPermission.getObjectPermissions("DoctorManage").then(res => {
      this.operationPermissionMap=res;
    });
  }

  queryCollapse(e) {
    e.toElement.innerHTML = this.isCollapse ? "展开查询条件<i class='fa fa-angle-down'></i>" : "收起查询条件<i class='fa fa-angle-up'></i>";
    this.isCollapse = !this.isCollapse;
  }

  get() {
    return this.doctorManageService.getData(this.doctorMangaeUrl, this.httpQuery, this.headers);
  }

  onSearch() {
    this.get().then(val => {
      this.items = val.List;
      this.pagination = val.Pagination;
    }).catch(this.handleError)
  }

  onAllCheck() {
    _.each(this.items, (o) => {
      o.isCheck = !this.allCheck
    });
  }

  pramas: any;

  private handleError(error: any): Promise<any> {
    alert(error.json().Message);
    return Promise.reject(error.json().Message || error);
  }

  onEdit(id: number) {
    this.pramas = _.first(_.filter(this.items, (o) => {
      return o.Id == id
    }));
    this.navigate(this.pramas);
  }

  onDelete(id: number) {
    if (confirm("你确定要删除吗？") == true) {
      this.doctorManageService.delete(this.doctorManageDeleteUrl, id, this.headers, this.doctorMangaeUrl).then(rus => {
        this.get().then(val => {
          this.items = val.List;
          this.pagination = val.Pagination;
        }).catch(this.handleError);
      }).catch(this.handleError);
    } else {
    }
  }

  onResetPassword(id: number) {
    if (confirm("你确定要重置为初始密码？") == true) {
      this.doctorManageService.resetPassword(this.doctorResetPasswordUrl, {"ids": id}, this.headers).then(val => {
        this.get().then(val => {
          this.items = val.List;
          this.pagination = val.Pagination;
        }).catch(this.handleError);
      }).catch(this.handleError)
    }
  }

  onAllDelete() {
    if (this.isEmpty(_.filter(this.items, (o) => {
        return o.isCheck
      }))) {

    } else {

    }
  }

  isEmpty(list: any) {
    return _.isEmpty(list)
  }

  navigate(pramas: any) {
    this.router.navigate(['index/doctorManageAdd'], {
      queryParams: pramas
    })
  }

  ////////////////////////////////////////////////////////////////
  @Input('data') meals: string[] = [];
  asyncMeals: Observable<string[]>;
  p: number = 1;
  total: number;
  loading: boolean;

  getPage(page: number) {
    this.httpQuery["pagination.pageIndex"] = page;

    this.get().then(res => {
      this.items = res.List;
      this.pagination = res.Pagination;
    }).catch(this.handleError)
    this.loading = true;
    this.asyncMeals = this.serverCall(this.meals, page)
      .do(res => {
        this.total = res.total;
        this.p = page;
        this.loading = false;
      })
      .map(res => res.items);
  }

  serverCall(meals: string[], page: number): Observable<IServerResponse> {
    // const perPage = this.pagination.PageSize;
    //const start = (page - 1) * perPage;
    //const end = start + perPage;

    return Observable
      .of({
        items: meals.slice(),
        total: this.pagination.dataCount
      }).delay(100);
  }

  //////////////////////////////////////////////////////////////////

  public ownedRoles: any[] = [];
  public notOwnedRoles: any[] = [];
  private docId: number = null;
  private roleIds: any = [];

  onQueryRoles(id: number) {
    this.docId = id;
    //已拥有的角色
    this.http.get(this.doctorOwnedRolesUrl, {headers: this.headers, params: {docId: id}}).toPromise().then(res => {
      if (res.status == 200 && res.json().Status == true) {
        this.ownedRoles = res.json().Data;
        this.bindAttr(this.ownedRoles,"IsSelect",false);
        this.bindAttr(this.ownedRoles,"normal",true);
      } else {
        alert(res.json().Message);
      }
    }).catch(this.handleError)
    //未拥有的角色
    this.http.get(this.doctorNotOwnedRolesUrl, {headers: this.headers, params: {docId: id}}).toPromise().then(res => {
      if (res.status == 200 && res.json().Status == true) {
        this.notOwnedRoles = res.json().Data;
        this.bindAttr(this.notOwnedRoles,"IsSelect",false);
        this.bindAttr(this.notOwnedRoles,"normal",false);
      } else {
        alert(res.json().Message);
      }
    }).catch(this.handleError)
  }
  onSelect(item:any,e){
    item.IsSelect = !item.IsSelect;
  }
  onRight(){
    let roles = _.filter(this.notOwnedRoles,(x) =>{return x.IsSelect});
    this.ownedRoles = this.ownedRoles.concat(roles);
    this.notOwnedRoles =_.filter(this.notOwnedRoles,(x) =>{return !x.IsSelect})
    this.bindAttr(this.ownedRoles,'IsSelect',false);
  }
  onLeft(){
    let roles = _.filter(this.ownedRoles,(x) =>{return x.IsSelect});
    this.notOwnedRoles = this.notOwnedRoles.concat(roles);
    this.ownedRoles =_.filter(this.ownedRoles,(x) =>{return !x.IsSelect})
    this.bindAttr(this.notOwnedRoles,'IsSelect',false);
  }
  onAllRight(){
    this.ownedRoles = this.ownedRoles.concat(this.notOwnedRoles);
    this.notOwnedRoles = [];
    this.bindAttr(this.ownedRoles,'IsSelect',false);
  }
  onAllLeft(){
    this.notOwnedRoles = this.notOwnedRoles.concat(this.ownedRoles);
    this.ownedRoles = [];
    this.bindAttr(this.notOwnedRoles,'IsSelect',false);
  }
  onSettingRoles(){
    this.roleIds  = [];
    _.each(this.ownedRoles,(x) =>{
      this.roleIds.push(x.Id);
    })

    this.http.put(this.setDoctorOwnedRolesUrl,this.docId,{headers:this.headers,params:{docId:this.docId,roleIds:this.roleIds}}).toPromise().then(res =>{
      if(res.status == 200 && res.json().Status == true){
       this.onSearch();
      }else{
        alert(res.json().Message);
      }
    }).catch(this.handleError)
  }

  bindAttr(list:any,attrbute:string,param:boolean){
    _.each(list,(item)=>{
      item[attrbute] = param;
    })
  }

  //\\拖拽start
  private hasClass(el:any,name:string){
    return new RegExp('(?:^|\\s+)'+name+'(?:\\s+|$)').test(el.className);
  }
  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }
  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }
  private onDrag(args) {
    let [e, el] = args;
    this.removeClass(e, 'ex-moved');

  }
  private onDrop(args) {
    let [e, el] = args;
    this.addClass(e, 'ex-moved');
    let normal = $(e).attr('data-normal');//true左移，false右移
    let roleid = $(e).attr('data-roleid');
    if(normal == "true"){
      let item = _.filter(this.ownedRoles,(x) => {return x.Id == roleid});
      _.first(item).normal = false;
     _.remove(this.ownedRoles,(x) => {return x.Id == roleid})
      this.notOwnedRoles =_.concat(this.notOwnedRoles,item);
    }else{
      let item = _.filter(this.notOwnedRoles,(x) => {return x.Id == roleid});
      _.first(item).normal = true;
      _.remove(this.notOwnedRoles,(x) => {return x.Id == roleid})
      this.ownedRoles =_.concat(this.ownedRoles,item);
    }
  }
  private onOver(args) {
    let [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }
  //\\拖拽end
}
/////////////////////////////////////////////////////
interface IServerResponse {
  items: string[];
  total: number;
}

///////////////////////////////////////////////////////
