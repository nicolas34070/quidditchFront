import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainAdminComponent } from './terrain-admin.component';

describe('TerrainAdminComponent', () => {
  let component: TerrainAdminComponent;
  let fixture: ComponentFixture<TerrainAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerrainAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrainAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
