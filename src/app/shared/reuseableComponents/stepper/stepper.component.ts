import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../elements/button.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  templateUrl: './stepper.component.html',
  imports: [CommonModule,ButtonComponent],
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {

  @Input() steps: Array<{ label: string, form: string }> = [];
  @Input() currentStep: number = 1;
  
  @Output() stepChange = new EventEmitter<number>();

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
      this.stepChange.emit(this.currentStep);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.stepChange.emit(this.currentStep);
    }
  }
}
