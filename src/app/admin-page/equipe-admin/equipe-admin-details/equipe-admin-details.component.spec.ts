import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeAdminDetailsComponent } from './equipe-admin-details.component';

describe('EquipeAdminDetailsComponent', () => {
  let component: EquipeAdminDetailsComponent;
  let fixture: ComponentFixture<EquipeAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
