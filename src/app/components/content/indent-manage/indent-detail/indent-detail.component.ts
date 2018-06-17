import { Component, OnInit } from '@angular/core';
import { WindowHeightInitService } from '../../shered-service/windowHeightInit.service';
import { LocalStorageService } from '../../../../app-localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-indent-detail',
  templateUrl: './indent-detail.component.html',
  styleUrls: ['./indent-detail.component.css'],
  providers: [WindowHeightInitService,LocalStorageService]
})
export class IndentDetailComponent implements OnInit {

  constructor(
    private localStorage:LocalStorageService,
    private windowHeight: WindowHeightInitService,
    private activatedRoute:ActivatedRoute
  ) { }

  public item:any;

  ngOnInit() {
    this.windowHeight.onInit();
    this.activatedRoute.queryParams.subscribe(pramas => {
      this.item = JSON.parse(pramas.data);
      console.log(JSON.parse(pramas.data))
		})
  }

}
