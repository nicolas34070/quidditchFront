import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerComponent } from './color-picker.component';
import { ClickOutsideModule } from '../click-outside/click-outside.module';
import { FormsModule } from '@angular/forms';

describe('ColorPickerComponent', () => {
    let component: ColorPickerComponent;
    let fixture: ComponentFixture<ColorPickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ClickOutsideModule],
            declarations: [ColorPickerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('openPicker()', () => {
        it('should update boolean properly', () => {
            component.isOpen = false;
            component.openPicker(new MouseEvent('click'));
            expect(component.isOpen).toBeTruthy();
            component.openPicker(new MouseEvent('click'));
            expect(component.isOpen).toBeFalsy();
        });
    });

    describe('selectColor()', () => {
        it('should emit event properly', () => {
            let validate = false;
            component.selectedColor = {id: 0, code: '#efefef'};
            component.selectedColorChange.subscribe(data => {
                validate = true;
            });
            component.selectColor({id: 5, code: '#fefefe'});
            expect(component.selectedColor.id).toEqual(5);
            expect(validate).toBeTruthy();
        });
    });


    describe('closePicker()', () => {
        it('should update boolean to false properly', () => {
            component.isOpen = true;
            component.closePicker();
            expect(component.isOpen).toBeFalsy();
        });
    });
});
