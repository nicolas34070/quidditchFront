import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ClickOutsideDirective } from './click-outside.directive';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestClickOutsideComponent } from './test-click-outside.component'
import { ClickOutsideInteractiveDirective } from './click-outside-interactive.directive';


describe('ClickOutSideDirective', () => {
    let testComponent: TestClickOutsideComponent;
    let fixture: ComponentFixture<TestClickOutsideComponent>;
    let directiveEl: DebugElement;
    let pEl: DebugElement;
    let h1El: DebugElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ClickOutsideDirective, ClickOutsideInteractiveDirective, TestClickOutsideComponent],
        });
        fixture = TestBed.createComponent(TestClickOutsideComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        directiveEl = fixture.debugElement.query(By.directive(ClickOutsideDirective));
        pEl = fixture.debugElement.query(By.css('p'));
        h1El = fixture.debugElement.query(By.css('h1'));
    });


    it('Should create directive', () => {
        expect(directiveEl).not.toBeNull();
    });


    it('emit event if according to clickOutsideDirective', () => {
        let validate = false;
        const clickOutsideDirectiveInstance = directiveEl.injector.get(ClickOutsideDirective);
        clickOutsideDirectiveInstance.appClickOutside.subscribe(data => {
            validate = !validate;
        });
        expect(validate).toBeFalsy();
        clickOutsideDirectiveInstance.onClick(pEl.nativeElement);
        expect(clickOutsideDirectiveInstance.onClick);
        expect(validate).toBeTruthy();
        clickOutsideDirectiveInstance.onClick(null);
        expect(validate).toBeTruthy();
    });
});
