import { Component, OnInit } from '@angular/core';
import { WindowHeightInitService} from '../shered-service/windowHeightInit.service'

@Component({
  selector: 'app-content',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [WindowHeightInitService]
})
export class ContentComponent implements OnInit {

  constructor(private windowHeight:WindowHeightInitService) { }

  ngOnInit() {
    //初始化系统height
    this.windowHeight.onInit()
  }

}
