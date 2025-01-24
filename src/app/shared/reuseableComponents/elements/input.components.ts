import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="flex flex-col">
      <label *ngIf="label" class="mb-2">{{ label }}</label>
      <input
        [ngClass]="classNames"
        [type]="type"
        [(ngModel)]="value"
        [placeholder]="placeholder"
        (blur)="onTouched()"
        (input)="onChange(value)"
      />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() classNames: string = 'border border-gray-300 p-2 rounded';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() label: string = '';

  // Define the function to notify the form control of a change
  onChange: (value: any) => void = () => {};

  // Define the function to notify the form control that the input was touched
  onTouched: () => void = () => {};

  // This method writes the value to the input
  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  // This method registers the function that is called when the value changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // This method registers the function that is called when the input is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Optional: Used to disable the input element
  setDisabledState?(isDisabled: boolean): void {
    // Here, you can disable the input field if necessary
  }
}
