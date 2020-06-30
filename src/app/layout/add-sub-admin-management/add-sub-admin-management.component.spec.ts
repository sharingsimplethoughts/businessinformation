import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubAdminManagementComponent } from './add-sub-admin-management.component';

describe('AddSubAdminManagementComponent', () => {
  let component: AddSubAdminManagementComponent;
  let fixture: ComponentFixture<AddSubAdminManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubAdminManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubAdminManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
