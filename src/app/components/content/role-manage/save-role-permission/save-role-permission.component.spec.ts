import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRolePermissionComponent } from './save-role-permission.component';

describe('SaveRolePermissionComponent', () => {
  let component: SaveRolePermissionComponent;
  let fixture: ComponentFixture<SaveRolePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveRolePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveRolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
