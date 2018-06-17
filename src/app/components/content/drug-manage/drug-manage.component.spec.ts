import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugManageComponent } from './drug-manage.component';

describe('DrugManageComponent', () => {
  let component: DrugManageComponent;
  let fixture: ComponentFixture<DrugManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
