import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysAdminComponent } from './pays-admin.component';

describe('PaysAdminComponent', () => {
  let component: PaysAdminComponent;
  let fixture: ComponentFixture<PaysAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaysAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaysAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
