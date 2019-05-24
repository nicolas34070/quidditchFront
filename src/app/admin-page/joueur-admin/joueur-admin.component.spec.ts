import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurAdminComponent } from './joueur-admin.component';

describe('JoueurAdminComponent', () => {
  let component: JoueurAdminComponent;
  let fixture: ComponentFixture<JoueurAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoueurAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
