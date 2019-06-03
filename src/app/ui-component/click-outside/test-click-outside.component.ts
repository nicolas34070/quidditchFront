import { Component } from '@angular/core';

@Component({
    template: `<div  appClickOutsideInteractive (clickOutsideDetected)="test()" (appClickOutside)="test()"  [targetClasses]="['testClass']">
    <h1 class="testClass" (click)="test2()">TEST</h1> </div> <p (click)="test2()">TEST</p> `
})
export class TestClickOutsideComponent {

    test2() { }
    test() { }
}
