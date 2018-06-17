import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http'; //  使用http
import { Router } from '@angular/router'; //使用路由
import { InterceptorService  } from 'ng2-interceptors';


import 'rxjs/add/operator/toPromise';
import { loginInfo } from "./loginInfo";
import { LocalStorageService } from '../../app-localstorage.service';

import * as _ from 'lodash'; //引入lodash.js

import {constService} from '../core/const.service'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [LocalStorageService]
})

export class LoginComponent implements OnInit {

	infoData: {};

  constructor(private http: InterceptorService,
		private router: Router,
		private localStorage: LocalStorageService,
     private consts : constService) {}

	private loginUrl = this.consts.baseUrl+'/api/Verification/Login';
	private headers = new Headers({
		'Content-Type': 'application/json'
	});

	ngOnInit() {
		//初始化系统height
		$('#login-page').css('height', $(window).height() + 'px');
		$(window).resize();
		$('.waitingscoll').hide();
		$('.errormsg').hide();
	}

	//"UserName": "SuperAdmin", "Password": "P@ssw0rd"
	//登录的方法
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

	private handleError(error: any): Promise < any > {
		$('.waitingscoll').hide();
		//console.error('An error occurred', error); // for demo purposes only
		if(error.json() && error.json().Message) {
			$('.errormsg').text(error.json().Message);
			$('.errormsg').show();
		} else {
			$('.errormsg').text("系统异常，请联系管理员(error-" + error.status + ")");
			$('.errormsg').show();
		}
		return Promise.reject(error.json().Message || error);
	}
}
