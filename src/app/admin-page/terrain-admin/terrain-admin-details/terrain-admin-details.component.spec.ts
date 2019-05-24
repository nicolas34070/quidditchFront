import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainAdminDetailsComponent } from './terrain-admin-details.component';

describe('TerrainAdminDetailsComponent', () => {
  let component: TerrainAdminDetailsComponent;
  let fixture: ComponentFixture<TerrainAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerrainAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrainAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
