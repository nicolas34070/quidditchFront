import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';


@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------


    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
