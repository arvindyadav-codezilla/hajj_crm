import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/reuseableComponents/elements/button.component';
import { InputComponent } from '@shared/reuseableComponents/elements/input.components';
import { SelectComponent } from '@shared/reuseableComponents/elements/select.component';

@Component({
  selector: 'job-other-details',
  standalone: true,
  imports: [CommonModule, FormsModule,InputComponent,SelectComponent,ButtonComponent],
  templateUrl: './other-details.component.html',
  styleUrl: './other-details.component.scss'
})
export class OtherDetailsComponent {
  selectedOption: string = '';
  

}
