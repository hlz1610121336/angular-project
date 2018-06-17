import { Component, OnInit } from '@angular/core';
import { WindowHeightInitService } from '../../shered-service/windowHeightInit.service';
import { DoctorManageModel } from '../doctor-manage-model';
import { LocalStorageService } from '../../../../app-localstorage.service';
import { DoctorManageAddService } from './doctor-manage-add.service';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash'; //引入lodash.js
@Component({
	selector: 'doctor-manage-add',
	templateUrl: './doctor-manage-add.component.html',
	styleUrls: ['./doctor-manage-add.component.css'],
	providers: [WindowHeightInitService, DoctorManageAddService, LocalStorageService]
})
export class DoctorManageAddComponent implements OnInit {

	constructor(
		private windowHeightInitService: WindowHeightInitService,
		private localStorage: LocalStorageService,
		private doctorManageAddService: DoctorManageAddService,
		private http: Http,
		private activatedRoute: ActivatedRoute,

	) {

	}
	self = this;
	ngOnInit() {
		//初始化系统height
		this.windowHeightInitService.onInit();
		this.activatedRoute.queryParams.subscribe(pramas => {
			this.editData = pramas;
		})
		this.isAdd(this.editData, this.createData);
	}
	editData: any;
	createData: DoctorManageModel = {
		Id: 0,
		Code: "",
		Name: "",
		Password: "",
		RoleNames: "",
		CreateTime: new Date(),
		LastUpdateTime: new Date(),
		Remark: "",
		CellPhone: "",
        Email:"",
		isCheck: false,
	}
	private doctorMangaeAddUrl = 'http://118.31.35.208:6688/api/Doctor/SaveDoctor';
	private headers = new Headers({
		'Content-Type': 'application/json',
		'token': this.localStorage.getItem('token')
	});

	isAdd(editData: DoctorManageModel, createData) {
		//修改
		if(editData.Id > 0) {
			$('#password-group').hide();
			$('.inpute-code').attr('readonly','readonly');
		}
		if(_.isEmpty(editData)) {
			return true;
		} else {
			_.forIn(this.editData, function(value, key) {
				key == "LastUpdateTime" ? createData[key] = new Date() : createData[key] = value;
			});
			return false;
		}
	}
	onSave() {
		this.doctorManageAddService.save(this.doctorMangaeAddUrl, this.createData, this.headers).then().catch()
	}

}
