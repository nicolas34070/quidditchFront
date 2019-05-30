import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ColorPaletteTypes } from 'src/app/enums/color-palette';
import { ToastComponent } from '../toast/toast.component';


@Injectable()
export class ToasterService {


    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------


    constructor(public snackBar: MatSnackBar) { }



    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------


    /**
     * Display toast.
     * @param {string} message - Message to display.
     * @param {ColorPaletteTypes} type - Color palette type.
     * @param {number} duration - Duration in milliseconds.
     */
    displayToast(message: string, type: ColorPaletteTypes = ColorPaletteTypes.primary, duration: number = 3000): void {
        this.snackBar.openFromComponent(ToastComponent, {
            duration,
            data: message,
            panelClass: `toast-${type}`,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    }
}
