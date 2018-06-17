import {Component, OnInit} from '@angular/core';
import {Headers, Http} from '@angular/http'; //  使用http
import {Router} from '@angular/router'; //使用路由
import {InterceptorService} from 'ng2-interceptors';
import {changePasswordInfo} from "./changePasswordInfo";
import { WindowHeightInitService } from '../shered-service/windowHeightInit.service';
import 'rxjs/add/operator/toPromise';
import {LocalStorageService} from '../../../app-localstorage.service';

import * as _ from 'lodash'; //引入lodash.js

import {constService} from '../../core/const.service'
import {toPromise} from "rxjs/operator/toPromise";

@Component({
  selector: 'change-password',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css'],
  providers: [LocalStorageService]
})

export class ChangePasswordComponent implements OnInit {

  constructor(private windowHeight: WindowHeightInitService,
              private http: InterceptorService,
              private router: Router,
              private localStorage: LocalStorageService,
              private consts: constService) {
  }

  private changePwdUrl = this.consts.baseUrl + '/api/Verification/UpdatePassword';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'token': this.localStorage.getItem('token')
  });


  //接受用户信息
  public userInfo: any = {}
  //接受接口返回信息
  public changePasswordApiData: any = {}

  ngOnInit() {
    //初始化系统height
    $('#login-page').css('height', $(window).height() + 'px');
    $(window).resize();
    $('.waitingscoll').hide();
    $('.errormsg').hide();
    this.windowHeight.onInit();
  }

  //"UserName": "SuperAdmin", "Password": "P@ssw0rd"
  //登录的方法


  changePassword(oldPwd: string, newPwd: string): Promise<changePasswordInfo> {
    this.userInfo = JSON.parse(this.localStorage.getItem("userInfo"));
    console.log(this.userInfo.Id);
    return this.http.put(this.changePwdUrl, JSON.stringify({
      "DoctorId": this.userInfo.Id,
      "OldPassword": oldPwd,
      "NewPssword": newPwd
    }), {
      headers: this.headers
    }).toPromise()
      .then(res => {
        this.changePasswordApiData = res.json().Data;
        console.log(this.changePasswordApiData);
        if (res.status == 200 && res.json().Status == true) {
          $('.errormsg').hide();
          alert("恭喜您，修改成功，点击确定返回重新登陆");
          this.router.navigate(['/login']); // 修改密码成功后跳转到登陆页面，重新登陆
        } else {
          $('.errormsg').text(res.json().Message);
          $('.errormsg').show();
        }
      }).catch(this.handleError);
  }


  commitChangePassword(oldPwd: string, newPwd: string, newPwdAgain: string) {
    $('.errormsg').hide();
    if (!oldPwd) {
      $('.errormsg').text("原密码不能为空");
      $('.errormsg').show();
      return;
    }
    if (!newPwd) {
      $('.errormsg').text("新密码不能为空");
      $('.errormsg').show();
      return;
    }
    if (!newPwdAgain) {
      $('.errormsg').text("确认新密码不能为空");
      $('.errormsg').show();
      return;
    }
    if (newPwd != newPwdAgain) {
      $('.errormsg').text("新密码与确认新密码不一致");
      $('.errormsg').show();
      return;
    }
    this.changePassword(oldPwd, newPwd);


  }

  /*
   loginIn(username: string, password: string): Promise < loginInfo > {
   $('.waitingscoll').show();
   return this.http.post(this.loginUrl, JSON.stringify({
   "UserName": username,
   "Password": password
   }), {
   headers: this.headers
   })
   .toPromise()
   .then(res => {
   this.infoData = res.json().Data;
   if(res.status == 200 && res.json().Status == true) {
   $('.errormsg').hide();
   let token = res.json().Data.Token;
   this.localStorage.setItem('token', token);
   this.localStorage.setItem('userInfo', JSON.stringify(res.json().Data.UserInfo));
   this.router.navigate(['/index'], {
   queryParams: res.json().Data.UserInfo
   }); // 登录成功后，跳转到首页
   } else {
   $('.waitingscoll').hide();
   $('.errormsg').text(res.json().Message);
   $('.errormsg').show();
   }
   }).catch(this.handleError);
   }
   */

  private handleError(error: any): Promise<any> {
    //$('.waitingscoll').hide();
    //console.error('An error occurred', error); // for demo purposes only
    if (error.json() && error.json().Message) {
      $('.errormsg').text(error.json().Message);
      $('.errormsg').show();
    } else {
      $('.errormsg').text("系统异常，请联系管理员(error-" + error.status + ")");
      $('.errormsg').show();
    }
    return Promise.reject(error.json().Message || error);
  }
}
