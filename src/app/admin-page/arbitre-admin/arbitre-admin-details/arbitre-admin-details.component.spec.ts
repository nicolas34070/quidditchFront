import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitreAdminDetailsComponent } from './arbitre-admin-details.component';

describe('ArbitreAdminDetailsComponent', () => {
  let component: ArbitreAdminDetailsComponent;
  let fixture: ComponentFixture<ArbitreAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbitreAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbitreAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
