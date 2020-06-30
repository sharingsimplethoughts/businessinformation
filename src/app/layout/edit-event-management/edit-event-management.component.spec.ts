import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventManagementComponent } from './edit-event-management.component';

describe('EditEventManagementComponent', () => {
  let component: EditEventManagementComponent;
  let fixture: ComponentFixture<EditEventManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
