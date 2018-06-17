
import { Component, OnInit } from '@angular/core';
import { WindowHeightInitService } from '../../shered-service/windowHeightInit.service';
import { LocalStorageService } from '../../../../app-localstorage.service';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute,Router, } from '@angular/router';
import { constService } from '../../../core/const.service';
import * as _ from 'lodash'; //����lodash.js
@Component({
  selector: 'app-add-indent',
  templateUrl: './add-indent.component.html',
  styleUrls: ['./add-indent.component.css']
})
export class AddIndentComponent implements OnInit {

 constructor(
		private windowHeightInitService: WindowHeightInitService,
		private localStorage: LocalStorageService,
		private http: Http,
		private activatedRoute: ActivatedRoute,
		private consts:constService,
		private router: Router,
	) {

	}
	self = this;
	ngOnInit() {
		//��ʼ��ϵͳheight
		this.windowHeightInitService.onInit();
		this.activatedRoute.queryParams.subscribe(pramas => {
			this.editData = JSON.parse(pramas.data);
		})
		this.isAdd(this.editData, this.createData);
	}
	editData: any;
	Customer:any ={
		Name:'',
		CellPhone:''
	};
	createData:any = {
		Id: 0,
		Number: "",
		CustomerId: 0,
		CustomerName:"",
		CustomerCellPhone:"",
		DoctorId: 0,
		DoctorName: "",
		CreateTime: new Date(),
		LastUpdateTime: new Date(),
		Remark: "",
		TotalAmount: "",
		Payment: 1,
		PaymentName: "",
		Customer:this.Customer,
		MedicalRecords: [],
	}
	MedicalRecords:any = {
		Patient:'',
		PatientPhone:'',
		PatientDescribe:'',
		Medicine:'',
		Remark:'',
	}
	
	private orderSaveUrl = this.consts.baseUrl + '/api/Order/SaveOrder';
	private headers = new Headers({
		'Content-Type': 'application/json',
		'token': this.localStorage.getItem('token')
	});
	private handleError(error: any): Promise<any> {
		//console.error('An error occurred', error); // for demo purposes only
		alert(error.json().Message);
		//alert(error.json().Message);
		return Promise.reject(error.json().Message || error);
		}
		//--------------------------------------------------------------------------------------
	 
	isAdd(editData: any, createData) {
		
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
		this.Customer.Name = this.createData.CustomerName;
		this.Customer.CellPhone = this.createData.CustomerCellPhone;
		
		 this.http.post(this.orderSaveUrl,this.createData,{headers:this.headers}).toPromise().then(res=>{
			if (res.status == 200 && res.json().Status == true){
				this.router.navigate(['index/indentManage'], {
					
				  })
			}else{
			  alert(res.json().Message);
			}
		   }).catch(this.handleError)
        }
	addMedicalRecords(){
		
		this.createData.MedicalRecords.push(this.MedicalRecords)
	}
}


