import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearBySearchComponent } from './near-by-search.component';
//--
describe('NearBySearchComponent', () => {
  let component: NearBySearchComponent;
  let fixture: ComponentFixture<NearBySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearBySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearBySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
