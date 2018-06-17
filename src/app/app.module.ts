import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';   // 使用Ng Model
import {Http, HttpModule} from '@angular/http';
import {AppComponent} from './app.component';

import {HeaderComponent} from './components/share/header/header.component';
import {MenuComponent} from './components/share/menu/menu.component';
import {AsideComponent} from './components/share/aside/aside.component';
import {IndexComponent} from './components/index/index.component';
import {FooterComponent} from './components/share/footer/footer.component';
import {LoginComponent} from './components/login/login.component';
import {ContentComponent} from './components/content/index/index.component';
import {DoctorManageComponent} from './components/content/doctor-manage/doctor-manage.component';
import {ChangePasswordComponent} from './components/content/changePassword/changePassword.component';
import {DoctorManageAddComponent} from './components/content/doctor-manage/doctor-manage-add/doctor-manage-add.component';
import {provideInterceptorService} from 'ng2-interceptors';
import {ServerURLInterceptor} from './components/core/http.interceptor';
import {operationPermissionService} from './components/core/operationPermission.service';
import {DoctorManageService} from './components/content/doctor-manage/doctor-manage.service';
import {LocalStorageService} from './app-localstorage.service';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {NgxPaginationModule} from 'ngx-pagination';
import {DragulaModule} from 'ng2-dragula';
import {SelectModule} from 'ng-select';

import {DrugManageComponent} from './components/content/drug-manage/drug-manage.component';
import {ApplianceManageComponent} from './components/content/appliance-manage/appliance-manage.component';
import {IndentManageComponent} from './components/content/indent-manage/indent-manage.component';
import {CaseManageComponent} from './components/content/case-manage/case-manage.component';
import {AppointmentManageComponent} from './components/content/appointment-manage/appointment-manage.component';
import {constService} from './components/core/const.service';
import {AddIndentComponent} from './components/content/indent-manage/add-indent/add-indent.component';
import {RoleManageComponent} from './components/content/role-manage/role-manage.component';
import { SaveRoleComponent } from './components/content/role-manage/save-role/save-role.component';
import { SaveRolePermissionComponent } from './components/content/role-manage/save-role-permission/save-role-permission.component';
import { IndentDetailComponent } from './components/content/indent-manage/indent-detail/indent-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    AsideComponent,
    ContentComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    DoctorManageComponent,
    DoctorManageAddComponent,
    DrugManageComponent,
    ApplianceManageComponent,
    IndentManageComponent,
    CaseManageComponent,
    AppointmentManageComponent,
    ChangePasswordComponent,
    AddIndentComponent,
    RoleManageComponent,
    SaveRoleComponent,
    SaveRolePermissionComponent,
    IndentDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    SlimLoadingBarModule.forRoot(),
    NgxPaginationModule,
    DragulaModule,
    SelectModule
  ],
  exports: [BrowserModule, SlimLoadingBarModule],
  providers: [DoctorManageService, LocalStorageService, constService, operationPermissionService,ServerURLInterceptor, provideInterceptorService([
    ServerURLInterceptor
  ])],
  bootstrap: [AppComponent]
})
export class AppModule {
}


