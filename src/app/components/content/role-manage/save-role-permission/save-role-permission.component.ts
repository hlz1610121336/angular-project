import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WindowHeightInitService} from '../../shered-service/windowHeightInit.service';
import {operationPermissionService} from '../../../core/operationPermission.service';
import {ObjectOperationsPermissionModule, OperationPermissionModule} from './object-operations-permission.module';
import {RoleManageService} from '../../role-manage/role-manage.service';
import {assertNumber} from '@angular/core/src/render3/assert';

import * as _ from 'lodash';

@Component({
  selector: 'app-save-role-permission',
  templateUrl: './save-role-permission.component.html',
  styleUrls: ['./save-role-permission.component.css'],
  providers: [WindowHeightInitService, operationPermissionService, ObjectOperationsPermissionModule, RoleManageService]
})
export class SaveRolePermissionComponent implements OnInit {

  constructor(private windowHeight: WindowHeightInitService,
              private  operationPermissionService: operationPermissionService,
              private  roleManageService: RoleManageService,
              private activatedRoute: ActivatedRoute) {
  }

  public allOperationObjects: ObjectOperationsPermissionModule[] = [];
  private roleId: any;

  ngOnInit() {
    this.windowHeight.onInit();
    this.activatedRoute.queryParams.subscribe(pramas => {
      this.roleId = pramas.roleId;
    });
    this.getAllOperationObjectPermissions();
  }

  //保存
  public onSave(): void {
    let configs: any = this.getConfigPermissions();
    this.roleManageService.saveConfigPermissions(configs);
  }

  //获取所有对象
  public getAllOperationObjectPermissions(): void {
    //取所有对象
    this.operationPermissionService.getAllOperationObjects().then(res => {
      //获取所有操作
      this.operationPermissionService.getAllOperations().then(allOpes => {
        //遍历所有权限得到权限操作
        this.roleManageService.getRoleObjectOperationPermission(this.roleId).then(allPers => {
          //遍历所有对象
          for (let obj of res) {
            let mdd = this.getAllObjectOperations(allOpes, allPers, obj);
            this.allOperationObjects.push(mdd);
          }
        });
      });
    });
  }

  //根据所有操作和对象获取对象权限模型数据
  private getAllObjectOperations(allOpes: any, allPers: any, obj: any): ObjectOperationsPermissionModule {
    let mdd: ObjectOperationsPermissionModule = new ObjectOperationsPermissionModule();
    mdd.Id = obj.Id;
    mdd.Code = obj.Code;
    mdd.DisplayName = obj.DisplayName;

    //查找权限
    let index = _.first(_.filter(allPers, (o) => {
      return o.ObjectCode == obj.Code;
    }));

    //遍历所有操作得到固有操作
    for (let ope in allOpes) {
      let itemValue: number = parseInt(ope);
      if ((obj.Operations & itemValue) == itemValue) {
        let opm = new OperationPermissionModule();
        opm.key = itemValue;
        opm.Name = allOpes[itemValue];
        opm.HasPermission = false;
        mdd.Operations.push(opm);
        if (index == null || index == undefined) {
          continue;
        }
        if ((index.Operation & itemValue) == itemValue) {
          opm.HasPermission = true;
        }
      }
    }
    return mdd;
  }

  //获取权限配置
  private getConfigPermissions(): any {
    let configs: any = [];
    for (let item of  this.allOperationObjects) {
      let config: any = {};
      config.RoleId = this.roleId;
      config.OperationObjectId = item.Id;
      for (let op of item.Operations) {
        if (op.HasPermission == true)
          config.Operation = config.Operation | op.key;
      }
      configs.push(config);
    }
    return configs;
  }

}
