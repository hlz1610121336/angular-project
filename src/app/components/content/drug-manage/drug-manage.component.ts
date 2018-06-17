import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { WindowHeightInitService } from '../shered-service/windowHeightInit.service';
import { LocalStorageService } from '../../../app-localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-drug-manage',
  templateUrl: './drug-manage.component.html',
  styleUrls: ['./drug-manage.component.css'],
  providers: [ WindowHeightInitService, LocalStorageService]
})
export class DrugManageComponent implements OnInit {

  constructor(
		private windowHeight: WindowHeightInitService,
		private http: Http,
		private localStorage: LocalStorageService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {

	}

  ngOnInit() {
		//初始化系统height
		this.windowHeight.onInit();
		this.onSearch();
		
	}
  public isCollapse: boolean = true;
	queryCollapse(e) {
		e.toElement.innerHTML = this.isCollapse ? "展开查询条件<i class='fa fa-angle-down'></i>" : "收起查询条件<i class='fa fa-angle-up'></i>";
		this.isCollapse = !this.isCollapse;
	}
  onSearch(){

  }

}
