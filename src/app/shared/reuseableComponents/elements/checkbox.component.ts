import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <label class="inline-flex items-center">
      <input
        type="checkbox"
        [(ngModel)]="checked"
        (ngModelChange)="onCheckedChange($event)"
        class="form-checkbox text-blue-500"
      />
      <span class="ml-2">{{ label }}</span>
    </label>
  `,
})
export class CheckboxComponent {
  @Input() label: string = '';
  @Input() checked: boolean = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  onCheckedChange(newValue: boolean): void {
    this.checkedChange.emit(newValue);
  }
}
