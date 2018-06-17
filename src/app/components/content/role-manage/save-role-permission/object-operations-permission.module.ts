import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ObjectOperationsPermissionModule {
  public Id: number = 0;
  public Code: string = '';
  public DisplayName: string = '';
  public Operations: OperationPermissionModule[]=[];
}

export class OperationPermissionModule {
  public key: number = 0;
  public Name: string = '';
  public HasPermission: boolean = false;
}
