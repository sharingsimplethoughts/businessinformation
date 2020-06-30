import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventManagementComponent } from './view-event-management.component';

describe('ViewEventManagementComponent', () => {
  let component: ViewEventManagementComponent;
  let fixture: ComponentFixture<ViewEventManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEventManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
