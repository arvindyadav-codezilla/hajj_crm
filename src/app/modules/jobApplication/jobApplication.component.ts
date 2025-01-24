import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '@shared/reuseableComponents/elements/button.component';
import { SelectComponent } from '@shared/reuseableComponents/elements/select.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { StepperComponent } from '@shared/reuseableComponents/stepper/stepper.component';
import { SelectPositionComponent } from './components/select-position/select-position.component';
import { AddressDetailsComponent } from './components/address-details/address-details.component';
import { WorkExperienceComponent } from './components/work-experience-details/work-experience-details.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { OtherDetailsComponent } from './components/other-details/other-details.component';

interface DropdownItem {
  item_id: number;
  item_text: string;
}


@Component({
  selector: 'app-jobApplication',
  standalone: true,
  imports: [CommonModule,OtherDetailsComponent,SelectPositionComponent,DocumentsComponent,WorkExperienceComponent,AddressDetailsComponent, FormsModule ,TranslateModule,ButtonComponent,SelectComponent,PersonalDetailsComponent,CommonModule,StepperComponent],
  templateUrl: './jobApplication.component.html',
  styleUrl: './jobApplication.component.scss'
})
export class JobApplicationComponent{
  selectedJobTitle: DropdownItem[] = [];
  selectedValue:string = ''
  currentStep: number = 1;

  steps = [
    { label: 'Personal Details', form: 'personal' },
    { label: 'Address Details', form: 'address' },
    { label: 'Work Experience', form: 'work' },
    { label: 'Documents', form: 'documents' },
    { label: 'Other Details', form: 'other' }
    
  ];

  onStepChange(newStep: number) {
    this.currentStep = newStep;
  }

 
  logSelectedJobTitle() {
    console.log('Selected Job Title:', this.selectedJobTitle);
  }
  
  handleJobTitleSelected(jobTitle: DropdownItem[]) {
    console.log(jobTitle)
    this.selectedJobTitle = jobTitle;
    console.log('Received Job Title from Child:', this.selectedJobTitle);
  }


}


