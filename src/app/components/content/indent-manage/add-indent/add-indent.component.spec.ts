import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndentComponent } from './add-indent.component';

describe('AddIndentComponent', () => {
  let component: AddIndentComponent;
  let fixture: ComponentFixture<AddIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
