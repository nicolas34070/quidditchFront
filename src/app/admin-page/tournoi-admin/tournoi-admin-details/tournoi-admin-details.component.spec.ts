import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoiAdminDetailsComponent } from './tournoi-admin-details.component';

describe('TournoiAdminDetailsComponent', () => {
  let component: TournoiAdminDetailsComponent;
  let fixture: ComponentFixture<TournoiAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournoiAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoiAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
