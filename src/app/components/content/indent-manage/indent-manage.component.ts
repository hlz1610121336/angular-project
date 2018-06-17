import { Component, OnInit,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { WindowHeightInitService } from '../shered-service/windowHeightInit.service';
import { LocalStorageService } from '../../../app-localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InterceptorService } from 'ng2-interceptors';
import { constService } from '../../core/const.service';
import { StaticDataService } from '../../../static-data.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

import * as _ from 'lodash'; //引入lodash.js

@Component({
  selector: 'app-indent-manage',
  templateUrl: './indent-manage.component.html',
  styleUrls: ['./indent-manage.component.css'],
  providers: [ WindowHeightInitService, LocalStorageService,StaticDataService]
})
export class IndentManageComponent implements OnInit {

  constructor(
		private windowHeight: WindowHeightInitService,
		private http: InterceptorService,
		private localStorage: LocalStorageService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private consts: constService,
		private staticData:StaticDataService
	) {
	
		
	}
	public doctors = [];
  ngOnInit() {
		//初始化系统height
		this.windowHeight.onInit();
		this.onSearch();
		this.getDoctors();
		this.getPage(1);
	}
//-------------------------------------------------------------------------------------
public pagination: any = {
	PageSize: 10,
	PageIndex: 1,
	DataCount: '',
	IsPaging: true,
	PageCount: ''
}
public httpQuery: any = {
	doctorId: '',
	customerName: '',
	customerCellphone: '',
	"pagination.pageSize": this.pagination.PageSize,
	"pagination.pageIndex": this.pagination.PageIndex,
	"pagination.dataCount": this.pagination.DataCount,
	"pagination.isPaging": this.pagination.IsPaging,
	"pagination.pageCount": this.pagination.PageCount
}
public isCollapse: boolean = true;
public items;
//-------------------------------------------------------------------------------------
  private baseUrl = this.consts.baseUrl; 
  private queryOrderUrl:string = this.baseUrl + '/api/Order/QueryOrder';
  private doctorsUrl = this.consts.baseUrl+'/api/Doctor/QueryDoctor';
  private deleteUrl = this.consts.baseUrl+'/api/Order/DeleteOrder/';
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
 
	queryCollapse(e) {
		e.toElement.innerHTML = this.isCollapse ? "展开查询条件<i class='fa fa-angle-down'></i>" : "收起查询条件<i class='fa fa-angle-up'></i>";
		this.isCollapse = !this.isCollapse;
	}
  onSearch(){
	  this.onQuerySelect();
	  this.search();
  }
	search(){
		return this.http.get(this.queryOrderUrl,{headers:this.headers,params:this.httpQuery}).toPromise().then(res =>{
			if(res.status == 200 && res.json().Status == true){
				this.items = res.json().Data.List;
				this.pagination = res.json().Data.Pagination;
			}else{
				alert(res.json().Message)
			}
		}).catch(this.handleError)
	}

	getDoctors(){
		return this.http.get(this.doctorsUrl,{headers:this.headers,params:{}}).toPromise().then(res => {
			
			if (res.status == 200 && res.json().Status == true) {
			  this.doctors = this.findList(res.json().Data.List);
			} else {
			  alert(res.json().Message);
			}
		   }).catch(this.handleError);
	}
	onQuerySelect(){
		let id = _.filter(this.doctors,(x)=>{return x.Name == $('#queryselect2').val()})
		if(!_.isEmpty(id))this.httpQuery.doctorId = _.first(id)['Id'];
	}
	findList(list:any){
		let options = [];
		_.each(list,(x)=>{
			options.push({options:x.Id,label:x.Name});
		});
		return options;
	}
	onDelete(id:any){
		this.http.delete(this.deleteUrl+id,{headers:this.headers}).toPromise().then(res =>{
			if (res.status == 200 && res.json().Status == true){
				this.onSearch();
			}else{
			  alert(res.json().Message);
			}
		   }).catch(this.handleError)
	}
	private editPramas;
	onEdit(id: any) {
		this.editPramas = _.first(_.filter(this.items, (o) => {
		  return o.Id == id
		}));
		this.navigate(this.editPramas);
	  }
	  navigate(pramas: any) {
		this.router.navigate(['index/addIndent'], {queryParams: {
			data:JSON.stringify(pramas)
		}})
	  }
	  onDetails(id:any){
		this.editPramas = _.first(_.filter(this.items, (o) => {
			return o.Id == id
		  }));
		  this.details(this.editPramas);
	  }
	  details(pramas:any){
		this.router.navigate(['index/indentDetail'], {queryParams: {
			   data:JSON.stringify(pramas)
		  }})
	  }
	//\\分页
	 ////////////////////////////////////////////////////////////////
	 @Input('data') meals: string[] = [];
	 asyncMeals: Observable<string[]>;
	 p: number = 1;
	 total: number;
	 loading: boolean;
 
	 getPage(page: number) {
		 this.httpQuery["pagination.pageIndex"] = page;
		 this.search()
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
	 
}
interface IServerResponse {
  items: string[];
  total: number;
}