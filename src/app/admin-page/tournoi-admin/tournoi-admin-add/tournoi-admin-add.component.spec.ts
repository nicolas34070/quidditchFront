import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoiAdminAddComponent } from './tournoi-admin-add.component';

describe('TournoiAdminAddComponent', () => {
  let component: TournoiAdminAddComponent;
  let fixture: ComponentFixture<TournoiAdminAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournoiAdminAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoiAdminAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
