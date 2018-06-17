import {Component, OnInit, Injectable} from '@angular/core';
import {Interceptor, InterceptedRequest, InterceptedResponse} from 'ng2-interceptors';
import {Router}    from '@angular/router';   //使用路由
import {LocalStorageService} from '../../app-localstorage.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Injectable()
export class ServerURLInterceptor implements Interceptor {
  constructor(private router: Router,
              private localStorage: LocalStorageService,
              private slimLoadingBarService: SlimLoadingBarService) {
  }

  public interceptBefore(request: InterceptedRequest): InterceptedRequest {
    // 修改请求
    //request.url = "http://localhost:8080/ovit-java-framework/"+request.url;
    // console.log("intercept url:" + request.url);
    this.slimLoadingBarService.start(() => {
      console.log('Loading complete');
    });
    return request;
  }

  public interceptAfter(response: InterceptedResponse): InterceptedResponse {
    // console.log(response);
    this.slimLoadingBarService.complete();
    if (response.response.status == 401) {
      if (this.localStorage.getItem('token')) {
        this.router.navigate(['/login']);
      }
    }
    return response;
  }

}
