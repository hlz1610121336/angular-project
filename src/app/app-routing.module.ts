import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './components/index/index.component';
import {LoginComponent} from './components/login/login.component';
import {ContentComponent} from './components/content/index/index.component';
import {DoctorManageComponent} from './components/content/doctor-manage/doctor-manage.component';
import {DoctorManageAddComponent} from './components/content/doctor-manage/doctor-manage-add/doctor-manage-add.component';
import {DrugManageComponent} from './components/content/drug-manage/drug-manage.component';
import {ApplianceManageComponent} from './components/content/appliance-manage/appliance-manage.component';
import {IndentManageComponent} from './components/content/indent-manage/indent-manage.component';
import {CaseManageComponent} from './components/content/case-manage/case-manage.component';
import {AppointmentManageComponent} from './components/content/appointment-manage/appointment-manage.component';
import { AddIndentComponent } from './components/content/indent-manage/add-indent/add-indent.component';
import {ChangePasswordComponent} from './components/content/changePassword/changePassword.component';
import {RoleManageComponent} from './components/content/role-manage/role-manage.component';
import {SaveRoleComponent} from './components/content/role-manage/save-role/save-role.component';
import {SaveRolePermissionComponent} from './components/content/role-manage/save-role-permission/save-role-permission.component';
import { IndentDetailComponent } from './components/content/indent-manage/indent-detail/indent-detail.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
    children: [
      {path: 'doctorManage', component: DoctorManageComponent},
      {path: 'doctorManageAdd', component: DoctorManageAddComponent},
      {path: 'drugManage', component: DrugManageComponent},
      {path: 'applianceManage', component: ApplianceManageComponent},
      {path: 'indentManage', component: IndentManageComponent},
      {path: 'caseManage', component: CaseManageComponent},
      {path: 'appointmentManage', component: AppointmentManageComponent},
      {path: 'changePassword', component: ChangePasswordComponent},
      { path:'addIndent',component:AddIndentComponent},
      { path:'indentDetail',component:IndentDetailComponent},
      {path: 'roleManage', component: RoleManageComponent},
      {path: 'saveRole', component: SaveRoleComponent},
      {path: 'saveRolePermission', component: SaveRolePermissionComponent},
      {path: '', component: ContentComponent},
    ],
  },
  {path: 'login', component: LoginComponent,},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
