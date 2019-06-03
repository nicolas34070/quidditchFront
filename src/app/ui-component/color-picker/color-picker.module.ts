import { NgModule } from '@angular/core';

import { ColorPickerComponent } from './color-picker.component';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from '../click-outside/click-outside.module';


@NgModule({
    declarations: [
        ColorPickerComponent
    ],
    imports: [
        CommonModule,
        ClickOutsideModule,

    ],
    exports: [
        ColorPickerComponent
    ]
})
export class ColorPickerModule { }
