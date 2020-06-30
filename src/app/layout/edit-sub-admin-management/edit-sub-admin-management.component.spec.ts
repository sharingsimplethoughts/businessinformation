import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubAdminManagementComponent } from './edit-sub-admin-management.component';

describe('EditSubAdminManagementComponent', () => {
  let component: EditSubAdminManagementComponent;
  let fixture: ComponentFixture<EditSubAdminManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubAdminManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubAdminManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
