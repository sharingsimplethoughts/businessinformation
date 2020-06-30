import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubAdminManagementComponent } from './view-sub-admin-management.component';

describe('ViewSubAdminManagementComponent', () => {
  let component: ViewSubAdminManagementComponent;
  let fixture: ComponentFixture<ViewSubAdminManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubAdminManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubAdminManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
