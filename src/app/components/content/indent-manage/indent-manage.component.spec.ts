import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentManageComponent } from './indent-manage.component';

describe('IndentManageComponent', () => {
  let component: IndentManageComponent;
  let fixture: ComponentFixture<IndentManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
