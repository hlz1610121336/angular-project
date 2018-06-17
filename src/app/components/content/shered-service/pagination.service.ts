import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {

  public PageSize:any;
  public PageIndex:any;
  public PageCount:any;
  public DataCount:any;
  public IsPaging:boolean = true;

}
