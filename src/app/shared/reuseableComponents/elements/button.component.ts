import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `<button 
               [ngClass]="getButtonClasses()" 
               [disabled]="disabled" 
               [type]="type" 
               (click)="onClick()">
                <ng-content></ng-content>
             </button>`,
})
export class ButtonComponent {
  @Input() classNames: string = 'font-bold py-2 px-4 rounded';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() variant: 'contained' | 'outline' = 'contained'; // Added variant input

  // Determine the appropriate button classes based on the variant
  getButtonClasses() {
    let baseClasses = `${this.classNames}`;
    if (this.variant === 'contained') {
      return `${baseClasses} bg-primary text-white border-none hover:bg-primary-dark`; // Contained style
    } else if (this.variant === 'outline') {
      return `${baseClasses} border-2 border-primary text-primary bg-transparent hover:bg-primary-light`; // Outline style
    }
    return baseClasses; // Default class
  }

  onClick() {
    console.log('Button clicked');
  }
}
