import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessManagementComponent } from './edit-business-management.component';

describe('EditBusinessManagementComponent', () => {
  let component: EditBusinessManagementComponent;
  let fixture: ComponentFixture<EditBusinessManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBusinessManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusinessManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
