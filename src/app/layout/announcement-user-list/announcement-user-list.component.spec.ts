import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementUserListComponent } from './announcement-user-list.component';

describe('AnnouncementUserListComponent', () => {
  let component: AnnouncementUserListComponent;
  let fixture: ComponentFixture<AnnouncementUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
