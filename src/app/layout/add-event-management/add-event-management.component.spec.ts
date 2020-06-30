import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventManagementComponent } from './add-event-management.component';

describe('AddEventManagementComponent', () => {
  let component: AddEventManagementComponent;
  let fixture: ComponentFixture<AddEventManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
