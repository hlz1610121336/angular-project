import {Component, OnInit} from '@angular/core';
import {WindowHeightInitService} from '../../shered-service/windowHeightInit.service';
import {LocalStorageService} from '../../../../app-localstorage.service';
import {Http, Headers} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {RoleManageService} from './../role-manage.service';

import * as _ from 'lodash';
import {DoctorManageModel} from '../../doctor-manage/doctor-manage-model'; //引入lodash.js

@Component({
  selector: 'app-save-role',
  templateUrl: './save-role.component.html',
  styleUrls: ['./save-role.component.css'],
  providers: [WindowHeightInitService, LocalStorageService, RoleManageService]
})

export class SaveRoleComponent implements OnInit {

  constructor(private windowHeightInitService: WindowHeightInitService,
              private localStorage: LocalStorageService,
              private roleManageService: RoleManageService,
              private http: Http,
              private activatedRoute: ActivatedRoute) {
  }

  public editData: any;
  public createData: any = {
    Id: 0,
    Code: '',
    FriendlyName: '',
    CreateTime: new Date(),
    LastUpdateTime: new Date(),
    Remark: '',
  };

  ngOnInit() {
    //初始化系统height
    this.windowHeightInitService.onInit();
    this.activatedRoute.queryParams.subscribe(pramas => {
      this.editData = pramas;
    });
    this.isAdd(this.editData, this.createData);
  }

  private isAdd(editData: any, createData) {
    if (_.isEmpty(editData)) {
      return true;
    } else {
      $('.readonly-code').attr('readonly','readonly');
      _.forIn(this.editData, function (value, key) {
        createData[key] = value;
      });
      return false;
    }
  }

  public onSave(): void {
    this.roleManageService.saveOneData(this.createData);
  }
}

