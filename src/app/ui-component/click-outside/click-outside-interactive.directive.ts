import {
    Directive,
    ElementRef,
    Output,
    EventEmitter,
    HostListener,
    Inject, Input
} from '@angular/core';

/**
 * This directive allows click outside effect with multiple customs components
 * How to use it :
 * <div appClickOutsideInteractive (clickOutsideDetected)="annulerSelection()" [targetClasses]="['jour']">
 */
@Directive({
    selector: '[appClickOutsideInteractive]'
})
export class ClickOutsideInteractiveDirective {


    // --------------------------------------------------
    //                     PROPERTIES
    // --------------------------------------------------


    /**
     * Classes targetted by our click outside.
     */
    @Input()
    public targetClasses: string[] = [];

    /**
     * Method to use on click outside.
     */
    @Output()
    public clickOutsideDetected = new EventEmitter<void>();



    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------


    constructor(
        @Inject(ElementRef) public _elementRef: ElementRef
    ) { }



    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------


    /**
     * On click, Verify if user click outside the reference element, reference also here by his css models.
     * @param {any} targetElement
     */
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any) {
        if (!targetElement) {
            return;
        }

        let clickedInside = false;
        let elements: HTMLCollection;
        for (let i = 0; i < this.targetClasses.length && !clickedInside; ++i) {
            elements = document.getElementsByClassName(this.targetClasses[i]);
            if (elements && elements.length > 0) {
                for (let j = 0; j < elements.length && !clickedInside; ++j) {
                    if (elements[j].contains(targetElement)) {
                        clickedInside = true;
                    }
                }
            }
        }

        if (!clickedInside) {
            this.clickOutsideDetected.emit();
        }
    }
}
