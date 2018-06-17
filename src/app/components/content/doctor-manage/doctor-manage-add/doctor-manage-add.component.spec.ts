import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorManageAddComponent } from './doctor-manage-add.component';

describe('DoctorManageAddComponent', () => {
  let component: DoctorManageAddComponent;
  let fixture: ComponentFixture<DoctorManageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorManageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
