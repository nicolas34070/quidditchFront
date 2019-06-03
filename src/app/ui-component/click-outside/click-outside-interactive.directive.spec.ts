import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ClickOutsideDirective } from './click-outside.directive';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestClickOutsideComponent } from './test-click-outside.component'
import { ClickOutsideInteractiveDirective } from './click-outside-interactive.directive';


describe('ClickOutSideInteractiveDirective', () => {
    let testComponent: TestClickOutsideComponent;
    let fixture: ComponentFixture<TestClickOutsideComponent>;
    let directiveEl: DebugElement;
    let pEl: DebugElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ClickOutsideInteractiveDirective, TestClickOutsideComponent],
        });
        fixture = TestBed.createComponent(TestClickOutsideComponent);
        testComponent = fixture.componentInstance;
        directiveEl = fixture.debugElement.query(By.directive(ClickOutsideInteractiveDirective));
        pEl = fixture.debugElement.query(By.css('p'));
    });


    it('should create directive', () => {
        expect(directiveEl).not.toBeNull();
    });
});
