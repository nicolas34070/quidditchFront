import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalScoreComponent } from './modal-score.component';

describe('ModalScoreComponent', () => {
  let component: ModalScoreComponent;
  let fixture: ComponentFixture<ModalScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
