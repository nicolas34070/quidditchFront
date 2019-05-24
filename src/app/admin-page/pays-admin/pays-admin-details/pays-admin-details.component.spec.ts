import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysAdminDetailsComponent } from './pays-admin-details.component';

describe('PaysAdminDetailsComponent', () => {
  let component: PaysAdminDetailsComponent;
  let fixture: ComponentFixture<PaysAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaysAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaysAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
