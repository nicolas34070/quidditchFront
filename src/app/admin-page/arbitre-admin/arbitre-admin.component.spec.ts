import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitreAdminComponent } from './arbitre-admin.component';

describe('ArbitreAdminComponent', () => {
  let component: ArbitreAdminComponent;
  let fixture: ComponentFixture<ArbitreAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbitreAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbitreAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
