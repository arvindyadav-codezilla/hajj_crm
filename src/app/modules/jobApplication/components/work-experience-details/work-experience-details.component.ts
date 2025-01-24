import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/reuseableComponents/elements/button.component';
import { InputComponent } from '@shared/reuseableComponents/elements/input.components';
import { SelectComponent } from '@shared/reuseableComponents/elements/select.component';

@Component({
  selector: 'job-work-experience-details',
  standalone: true,
  imports: [CommonModule, FormsModule,InputComponent,SelectComponent,ButtonComponent],
  templateUrl: './work-experience-details.component.html',
  styleUrl: './work-experience-details.component.scss'
})
export class WorkExperienceComponent {
  selectedOption: string = '';
  

}
