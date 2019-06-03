import { NgModule } from '@angular/core';

import { ClickOutsideDirective } from './click-outside.directive';
import { ClickOutsideInteractiveDirective } from './click-outside-interactive.directive';

@NgModule({
    declarations: [
        ClickOutsideDirective,
        ClickOutsideInteractiveDirective
    ],
    exports: [
        ClickOutsideDirective,
        ClickOutsideInteractiveDirective
    ]
})
export class ClickOutsideModule { }
