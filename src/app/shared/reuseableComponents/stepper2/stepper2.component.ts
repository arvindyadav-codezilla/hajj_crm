import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stepper2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper2.component.html',
  styleUrl: './stepper2.component.scss'
})
export class Stepper2Component {
  @Input() steps: { id: number; name: string }[] = [];
  @Input() currentStep: number = 1;
  @Output() stepChange = new EventEmitter<number>();

  isCompleted(stepId: number): boolean {
    return stepId < this.currentStep;
  }

  isActive(stepId: number): boolean {
    return stepId === this.currentStep;
  }

  changeStep(stepId: number) {
    if (stepId <= this.currentStep) {
      this.stepChange.emit(stepId);
    }
  }
}
