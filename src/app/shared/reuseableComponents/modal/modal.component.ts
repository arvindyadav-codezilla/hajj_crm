import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../elements/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,ButtonComponent],
  templateUrl: './modal.component.html',
//   styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() isOpen: boolean = false;  // Modal visibility controlled by parent
  @Input() title: string = '';  // Modal title passed from parent
  @Input() content: string = '';  // Modal content passed from parent
  @Input() buttonText: string = 'Close';  // Button text passed from parent

  @Output() close = new EventEmitter<void>();  // Event emitted to parent when closed
  @Output() confirm = new EventEmitter<void>();  // Event emitted when confirm button is clicked

  closeModal() {
    this.close.emit();  // Emit close event to parent
  }

  confirmModal() {
    this.confirm.emit();  // Emit confirm event to parent
  }
}
