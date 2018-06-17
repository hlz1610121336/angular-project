import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../app-localstorage.service';

import {operationPermissionService} from '../../core/operationPermission.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [LocalStorageService, operationPermissionService]
})
export class MenuComponent implements OnInit {
  public userInfo: any;
  public perssionMenu: any[] = [];

  constructor(private localStorage: LocalStorageService,
              private operationPermission: operationPermissionService) {
  }

  ngOnInit() {
    this.userInfo = JSON.parse(this.localStorage.getItem('userInfo'));
    this.operationPermission.getPermissionMenu().then(res => {
      this.operationPermissionToMenu(res);
    });
  }

  private operationPermissionToMenu(permission: any): any {
    for (let item of  permission){
      this.perssionMenu[item.ObjectCode]=item;
    }
  }


  menuOpen(event) {
    // if($(event.srcElement).attr('id')==='menuopen'){
    //   if ($(event.toElement).parent('li').hasClass('menu-open')) {
    //     $(event.toElement).parent('li').removeClass('menu-open');
    //     $(event.toElement).next('ul').stop().slideUp();
    //   } else {
    //     $(event.toElement).parent('li').addClass('menu-open');
    //     $(event.toElement).next('ul').stop().slideDown();

    //   }
    // }
  }
}
