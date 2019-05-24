import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurAdminDetailsComponent } from './joueur-admin-details.component';

describe('JoueurAdminDetailsComponent', () => {
  let component: JoueurAdminDetailsComponent;
  let fixture: ComponentFixture<JoueurAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoueurAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
