import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorManageComponent } from './doctor-manage.component';

describe('DoctorManageComponent', () => {
  let component: DoctorManageComponent;
  let fixture: ComponentFixture<DoctorManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
