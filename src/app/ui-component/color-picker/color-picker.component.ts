import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorModel } from './models/color-model.interface';

@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

    // --------------------------------------------
    //           INPUTS
    // --------------------------------------------

    @Input() colors: Array<ColorModel> = [];
    @Input() selectedColor: ColorModel;
    @Input() openSide = 'bottom';


    // --------------------------------------------
    //           OUTPUTS
    // --------------------------------------------

    @Output() selectedColorChange = new EventEmitter<ColorModel>();


    // --------------------------------------------
    //           PROPERTIES
    // --------------------------------------------

    public isOpen = false;


    // --------------------------------------------
    //           CONSTRUCTOR
    // --------------------------------------------


    constructor() { }



    // --------------------------------------------
    //            METHODS
    // --------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        if (!this.selectedColor) {
            this.selectedColor = this.colors[0];
        }
    }

    /**
     * Select a new color from the color picker
     * @param color: object clicked
     */
    selectColor(color: ColorModel): void {
        this.selectedColor = color;
        this.isOpen = false;
        this.selectedColorChange.emit(color);
    }

    /**
     * Open Color picker
     * @param event: mouse event
     */
    openPicker(event): void {
        event.stopPropagation();
        this.isOpen = !this.isOpen;
    }

    /**
     * Close Color picker
     */
    closePicker(): void {
        this.isOpen = false;
    }
}
