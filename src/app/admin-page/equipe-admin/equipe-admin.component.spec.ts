import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeAdminComponent } from './equipe-admin.component';

describe('EquipeAdminComponent', () => {
  let component: EquipeAdminComponent;
  let fixture: ComponentFixture<EquipeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
