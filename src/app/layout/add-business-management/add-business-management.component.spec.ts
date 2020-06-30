import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessManagementComponent } from './add-business-management.component';

describe('AddBusinessManagementComponent', () => {
  let component: AddBusinessManagementComponent;
  let fixture: ComponentFixture<AddBusinessManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBusinessManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
