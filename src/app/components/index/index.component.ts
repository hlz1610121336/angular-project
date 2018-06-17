import {Component, OnInit} from '@angular/core';
import {WindowHeightInitService} from '../content/shered-service/windowHeightInit.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [WindowHeightInitService]
})
export class IndexComponent implements OnInit {

  constructor(private windowHeight: WindowHeightInitService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.windowHeight.onInit();
    this.activatedRoute.queryParams.subscribe(pramas => {
    });
  }

}
