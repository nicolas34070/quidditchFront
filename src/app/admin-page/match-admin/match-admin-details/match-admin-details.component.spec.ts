import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAdminDetailsComponent } from './match-admin-details.component';

describe('MatchAdminDetailsComponent', () => {
  let component: MatchAdminDetailsComponent;
  let fixture: ComponentFixture<MatchAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
