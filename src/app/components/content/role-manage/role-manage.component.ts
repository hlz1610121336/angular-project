import {Component, OnInit, Input} from '@angular/core';
import {WindowHeightInitService} from '../shered-service/windowHeightInit.service';
import {LocalStorageService} from '../../../app-localstorage.service';
import {Router, ActivatedRoute} from '@angular/router';
import {InterceptorService} from 'ng2-interceptors';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

import * as _ from 'lodash';
import {operationPermissionService} from '../../core/operationPermission.service';
import {RoleManageService} from './role-manage.service';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.css'],
  providers: [WindowHeightInitService, LocalStorageService, RoleManageService]
})
export class RoleManageComponent implements OnInit {

  constructor(private windowHeight: WindowHeightInitService,
              private http: InterceptorService,
              private localStorage: LocalStorageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private operationPermission: operationPermissionService,
              private  roleManageService: RoleManageService) {
  }

//----------------一些变量---------------------------------------------------------------------
  public pagination: any = {
    PageSize: 10,
    PageIndex: 1,
    DataCount: '',
    IsPaging: true,
    PageCount: ''
  };
  public httpQuery: any = {
    code: '',
    name: '',
    'pagination.pageSize': this.pagination.PageSize,
    'pagination.pageIndex': this.pagination.PageIndex,
    'pagination.dataCount': this.pagination.DataCount,
    'pagination.isPaging': this.pagination.IsPaging,
    'pagination.pageCount': this.pagination.PageCount
  };

  public isCollapse: boolean = true;
  public items;
  public operationPermissionMap: any;
  private editParameter;
  public ownedMembers: any[] = [];
  public notOwnedMembers: any[] = [];
  private roleId: number = null;
  private docIds: any = [];

  //-------------------------------------------------------------------------------------------------

  public ngOnInit(): void {
    //初始化系统height
    this.windowHeight.onInit();
    this.onSearch();
    this.getPage(1);
    this.operationPermission.getObjectPermissions('RoleManage').then(res => {
      this.operationPermissionMap = res;
    });
  }

  public queryCollapse(e) {
    e.toElement.innerHTML = this.isCollapse ? '展开查询条件<i class=\'fa fa-angle-down\'></i>' : '收起查询条件<i class=\'fa fa-angle-up\'></i>';
    this.isCollapse = !this.isCollapse;
  }

  //查询列表
  public onSearch() {
    this.roleManageService.getListData(this.httpQuery).then(val => {
      this.items = val.List;
      this.pagination = val.Pagination;
    }).catch(this.handleError);
  }

  //删除
  public onDelete(id: number) {
    if (confirm('你确定要删除吗？') == true) {
      this.roleManageService.deleteOne(id).then(rus => {
        this.onSearch();
      }).catch(this.handleError);
    }
  }

  //新建和更新
  public onEdit(id: number): void {
    this.editParameter = _.first(_.filter(this.items, (o) => {
      return o.Id == id;
    }));
    this.navigate('index/saveRole', this.editParameter);
  }

  //获取已配和未配的成员
  public onGetConfigMembers(roleId: number) {
    this.roleId = roleId;
    //已配的成员
    this.roleManageService.getOwnedMembers(roleId).then(val => {
      this.ownedMembers = val;
      this.bindAttr(this.ownedMembers, 'IsSelect', false);
      this.bindAttr(this.ownedMembers, 'normal', true);
    }).catch(this.handleError);

    //未拥有的角色
    this.roleManageService.getNotOwnedMembers(roleId).then(val => {
      this.notOwnedMembers = val;
      this.bindAttr(this.notOwnedMembers, 'IsSelect', false);
      this.bindAttr(this.notOwnedMembers, 'normal', false);
    }).catch(this.handleError);
  }

  //保存配置的成员
  public onSaveConfigMembers() {
    this.docIds = [];
    _.each(this.ownedMembers, (x) => {
      this.docIds.push(x.Id);
    });

    this.roleManageService.saveConfigMembers(this.roleId, this.docIds).then(res => {
      this.onSearch();
    }).catch(this.handleError);
  }

  //配置角色权限
  public onConfigPermission(roleId: number): any {
    this.roleId = roleId;
    this.navigate('index/saveRolePermission', {roleId: this.roleId});
  }

  onSelect(item: any, e) {
    item.IsSelect = !item.IsSelect;
  }

  onRight() {
    let members = _.filter(this.notOwnedMembers, (x) => {
      return x.IsSelect;
    });
    this.ownedMembers = this.ownedMembers.concat(members);
    this.notOwnedMembers = _.filter(this.notOwnedMembers, (x) => {
      return !x.IsSelect;
    });
    this.bindAttr(this.ownedMembers, 'IsSelect', false);
  }

  onLeft() {
    let members = _.filter(this.ownedMembers, (x) => {
      return x.IsSelect;
    });
    this.notOwnedMembers = this.notOwnedMembers.concat(members);
    this.ownedMembers = _.filter(this.ownedMembers, (x) => {
      return !x.IsSelect;
    });
    this.bindAttr(this.notOwnedMembers, 'IsSelect', false);
  }

  onAllRight() {
    this.ownedMembers = this.ownedMembers.concat(this.notOwnedMembers);
    this.notOwnedMembers = [];
    this.bindAttr(this.ownedMembers, 'IsSelect', false);
  }

  onAllLeft() {
    this.notOwnedMembers = this.notOwnedMembers.concat(this.ownedMembers);
    this.ownedMembers = [];
    this.bindAttr(this.notOwnedMembers, 'IsSelect', false);
  }

  navigate(rout: string, parameter: any): void {
    this.router.navigate([rout], {
      queryParams: parameter
    });
  }

  bindAttr(list: any, attrbute: string, param: boolean) {
    _.each(list, (item) => {
      item[attrbute] = param;
    });
  }

  //\\分页
  ////////////////////////////////////////////////////////////////
  @Input('data') meals: string[] = [];
  asyncMeals: Observable<string[]>;
  p: number = 1;
  total: number;
  loading: boolean;

  getPage(page: number) {
    this.httpQuery['pagination.pageIndex'] = page;
    this.onSearch();
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

  private handleError(error: any): Promise<any> {
    alert(error.json().Message);
    return Promise.reject(error.json().Message || error);
  }
}

interface IServerResponse {
  items: string[];
  total: number;
}
