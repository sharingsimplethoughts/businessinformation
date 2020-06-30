import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBusinessManagementComponent } from './view-business-management.component';

describe('ViewBusinessManagementComponent', () => {
  let component: ViewBusinessManagementComponent;
  let fixture: ComponentFixture<ViewBusinessManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBusinessManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBusinessManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
