import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <label class="inline-flex items-center">
      <input
        type="radio"
        [name]="name"
        [value]="value"
        [(ngModel)]="selectedValue"
        (ngModelChange)="onSelectionChange($event)"
        class="form-radio text-blue-500"
      />
      <span class="ml-2">{{ label }}</span>
    </label>
  `,
})
export class RadioComponent {
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() selectedValue: string = '';
  @Input() label: string = '';

  @Output() selectedValueChange = new EventEmitter<string>();

  onSelectionChange(newValue: string): void {
    this.selectedValueChange.emit(newValue);
  }
}
