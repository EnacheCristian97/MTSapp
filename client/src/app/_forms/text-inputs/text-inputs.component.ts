import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';


@Component({
  selector: 'app-text-inputs',
  templateUrl: './text-inputs.component.html',
  styleUrls: ['./text-inputs.component.css']
})
export class TextInputsComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type: 'text';

  constructor(@Self() @Optional() public ngControl : NgControl) {
    this.ngControl.valueAccessor = this;
   }
    
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

}
