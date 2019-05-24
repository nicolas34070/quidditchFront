import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoiAdminComponent } from './tournoi-admin.component';

describe('TournoiAdminComponent', () => {
  let component: TournoiAdminComponent;
  let fixture: ComponentFixture<TournoiAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournoiAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoiAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
