import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="flex flex-col">
      <label *ngIf="label" class="mb-2">{{ label }}</label>
      <select [ngClass]="classNames" [(ngModel)]="selectedValue" (ngModelChange)="onValueChange($event)" placeholder="Select Option">
        <option value="" disabled selected>{{ selectOption }}</option>
        <option *ngFor="let option of options" [value]="option">{{ option }}</option>
      </select>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() classNames: string = 'border border-gray-300 p-2 rounded';
  @Input() options: string[] = [];
  @Input() selectedValue: string = '';
  @Input() label: string = '';
  @Input() selectOption: string = '';

  // Implement the ControlValueAccessor methods

  // To update the value
  writeValue(value: any): void {
    if (value !== undefined && value !== this.selectedValue) {
      this.selectedValue = value;
    }
  }

  // To register a change function
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // To register a touched function
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // When the value changes, emit the change event
  onValueChange(value: string) {
    this.selectedValue = value;
    this.onChange(value);
  }

  // These are required by ControlValueAccessor but not used in this case
  onTouched() {}

  onChange(value: any) {
    // This is a placeholder, it will be assigned when registerOnChange is called
  }
}
