import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentManageComponent } from './appointment-manage.component';

describe('AppointmentManageComponent', () => {
  let component: AppointmentManageComponent;
  let fixture: ComponentFixture<AppointmentManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
