import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../app-localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [LocalStorageService]
})
export class HeaderComponent implements OnInit {
  public userInfo:any;
  constructor(private localStorage:LocalStorageService) { }

  ngOnInit() {
    this.userInfo =JSON.parse(this.localStorage.getItem('userInfo'));
  }
  
  signOut(){
    return this.localStorage.removeItem('token');
  }
}
