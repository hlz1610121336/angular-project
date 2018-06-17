import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceManageComponent } from './appliance-manage.component';

describe('ApplianceManageComponent', () => {
  let component: ApplianceManageComponent;
  let fixture: ComponentFixture<ApplianceManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
