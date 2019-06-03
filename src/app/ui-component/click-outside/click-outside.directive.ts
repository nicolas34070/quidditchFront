import {
    Directive,
    ElementRef,
    Output,
    EventEmitter,
    HostListener,
    Inject,
    Input
} from '@angular/core';

@Directive({
    selector: '[appClickOutside]'
})
export class ClickOutsideDirective {


    // --------------------------------------------------
    //                     PROPERTIES
    // --------------------------------------------------


    @Output()
    public appClickOutside = new EventEmitter<void>();



    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------


    constructor(
        @Inject(ElementRef) public elementRef: ElementRef
    ) { }



    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------


    /**
     * On click, Verify if user click outside the reference element.
     * @param {any} targetElement
     */
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any) {
        if (!targetElement) {
            return;
        }

        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.appClickOutside.emit();
        }
    }
}
