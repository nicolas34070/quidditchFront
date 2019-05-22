import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoiPageComponent } from './tournoi-page.component';

describe('TournoiPageComponent', () => {
  let component: TournoiPageComponent;
  let fixture: ComponentFixture<TournoiPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournoiPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
