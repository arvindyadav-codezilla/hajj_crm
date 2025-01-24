import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@shared/reuseableComponents/elements/input.components';
import { NgSelectComponent } from '@shared/reuseableComponents/elements/ngSelect.component';
import { Stepper2Component } from '@shared/reuseableComponents/stepper2/stepper2.component';
import { SelectPositionComponent } from '../jobApplication/components/select-position/select-position.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@shared/reuseableComponents/elements/button.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LanguageService } from '@core/services/language.service';
import { JobSchemaService } from '@core/services/jobSchema.service';
import { take } from 'rxjs';

export interface Field {
  label: string;
  type: 'text' | 'email' | 'select' | 'date' | 'file' | 'radio' | 'checkbox';
  name: string;
  placeholder?: string | undefined;
  validation: string[];
  options?: any[];  // Optional, only for 'select', 'radio', 'checkbox' types
  isRadioGroup?: boolean;  // Only for radio buttons
  isCheckboxGroup?: boolean;  // Only for checkbox
}

interface DropdownItem {
  item_id: number;
  item_text: string;
}

interface Section {
  title: string;
  fields: Field[];
}




@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [CommonModule,ToastrModule, ButtonComponent, Stepper2Component,SelectPositionComponent, ReactiveFormsModule, InputComponent, NgSelectComponent,TranslateModule],
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.scss'],
})
export class MultiStepFormComponent implements OnInit {
  
  currentStep = 2;
  selectedJobTitle: DropdownItem[] = [];
  selectedOption: string = '';
  jobSchemaData: any;
  selectedItems: DropdownItem[] = [];
  form: FormGroup;  // Declare the form
  toast:ToastrService = inject(ToastrService);
  steps = [
    { id: 1, name: 'Personal Information' },
    { id: 2, name: 'Address Details' },
    { id: 3, name: 'Work Experience' },
    { id: 4, name: 'Document' },
    { id: 5, name: 'Other Details' },
  ];


  //   {
  //     section: 'Personal Information',
  //     fields: [
  //       { label: 'First Name', type: 'text', name: 'firstName', placeholder: 'Enter your name', validation: ['required'] },
  //       { label: 'Second Name', type: 'text', name: 'secondName', placeholder: 'Enter your Second name', validation: ['required'] },
  //       { label: 'Last Name', type: 'text', name: 'lastName', placeholder: 'Enter your last name', validation: ['required'] },
  //       { label: 'Family Name', type: 'text', name: 'familyName', placeholder: 'Enter your family name', validation: ['required'] },
  //       { label: 'Date of Birth', type: 'date', name: 'dob', placeholder: 'Enter your birthdate', validation: ['required'] },
  //       { label: 'Gender', type: 'select', name: 'gender', options: ['Male', 'Female', 'Other'], validation: ['required'] },
  //       { label: 'Nationality', type: 'select', name: 'nationality', options: ['National Id', 'Public Id', 'Other'], validation: ['required'] },
  //     ]
  //   },
  //   {
  //     section: 'Identification Information',
  //     fields: [
  //       { label: 'Id Type', type: 'select', name: 'idType', options: ['National Id', 'Public Id', 'Other'], validation: ['required'] },
  //       { label: 'Id Number', type: 'text', name: 'idNumber', placeholder: 'Enter your Id Number', validation: ['required'] },
  //       { label: 'Place of Residents', type: 'select', name: 'PlaceOfResidents', options: ['National Id', 'Public Id', 'Other'], validation: ['required'] },
  //     ]
  //   },
  //   {
  //     section: 'Contact Information',
  //     fields: [
  //       { label: 'Mobile Number', type: 'text', name: 'mobile', placeholder: 'Enter your mobile number', validation: ['required'] },
  //       { label: 'Verify OTP', type: 'text', name: 'verifyOTP', placeholder: 'Enter OTP', validation: ['required'] },
  //       { label: 'Email Address', type: 'email', name: 'email', placeholder: 'Enter your email', validation: ['required', 'email'] },
  //       { label: 'Phone Number', type: 'text', name: 'phone', placeholder: 'Enter your phone number', validation: ['required'] },
  //       { label: 'Alternative Mobile Number', type: 'text', name: 'contactMobile', placeholder: 'Enter your Alternative Mobile Number', validation: ['required'] },
  //       { label: 'Alternative Contact Name', type: 'text', name: 'contactName', placeholder: 'Enter your Alternative Contact Name', validation: ['required'] },
  //     ]
  //   }
  // ];
  

  // Define the fields for each step
  fieldsStep1: Field[] = [
    { label: 'First Name', type: 'text', name: 'firstName', placeholder: 'Enter your name', validation: ['required'] },
    { label: 'Second Name', type: 'text', name: 'secondName', placeholder: 'Enter your Second name', validation: ['required'] },
    { label: 'Last Name', type: 'text', name: 'lastName', placeholder: 'Enter your last name', validation: ['required'] },
    { label: 'Family Name', type: 'text', name: 'familyName', placeholder: 'Enter your family name', validation: ['required'] },
    { label: 'Id Type', type: 'select', name: 'idType',placeholder: 'Select Type', options: ['National Id', 'Public Id', 'Other'], validation: ['required'] },
    { label: 'Id Number', type: 'text', name: 'idNumber', placeholder: 'Enter your Id Number', validation: ['required'] },
    { label: 'Nationality', type: 'select', name: 'nationality',placeholder: 'Select Nationality', options: ['National Id', 'Public Id', 'Other'], validation: ['required'] },
    { label: 'Date of Birth', type: 'date', name: 'dob', placeholder: 'Enter your birthdate', validation: ['required'] },
    { label: 'Place Of Residents', type: 'select', name: 'PlaceOfResidents',placeholder: 'Select Place Of Residents', options: ['National Id', 'Public Id', 'Other'], validation: ['required'] },
    { label: 'Gender', type: 'select', name: 'gender',placeholder: 'Select Gender', options: ['Male', 'Female', 'Other'], validation: ['required'] },
    { label: 'Mobile Number', type: 'text', name: 'mobile', placeholder: 'Enter your mobile number', validation: ['required'] },
    { label: 'Verify OTP *', type: 'text', name: 'verifyOTP', placeholder: 'Enter your Verify OTP', validation: ['required'] },
    { label: 'Email Address', type: 'email', name: 'email', placeholder: 'Enter your email', validation: ['required', 'email'] },
    { label: 'Phone Number', type: 'text', name: 'phone', placeholder: 'Enter your Phone Number', validation: ['required'] },
    { label: 'Alternative Mobile Number', type: 'text', name: 'contactMobile', placeholder: 'Enter your Alternative Mobile Number', validation: ['required'] },
    { label: 'Alternative Contact Name', type: 'text', name: 'contactName', placeholder: 'Enter your Alternative Contact Name', validation: ['required'] },
  ];

  fieldsStep2: Field[] = [
    { label: 'Building Number', type: 'text', name: 'buildingNumber', placeholder: 'Enter building number', validation: ['required'] },
    { label: 'Postal Code', type: 'text', name: 'postalCode', placeholder: 'Enter postal code', validation: ['required'] },
    { label: 'Street', type: 'text', name: 'street', placeholder: 'Enter street', validation: ['required'] },
    { label: 'District', type: 'text', name: 'district', placeholder: 'Enter district', validation: ['required'] },
    { label: 'City', type: 'text', name: 'city', placeholder: 'Enter city', validation: ['required'] },
    { label: 'Academic\qualifications/courses', type: 'select', name: 'Academic',placeholder: 'Select Academic\qualifications/courses', options: ['Diploma', 'Bachloer', 'Master'], validation: ['required'] },
    { label: 'Specialit', type: 'select', name: 'Specialit',placeholder: 'Select Specialit', options: ['National Id', 'Public Id', 'Other'], validation: ['required'] },
    { label: 'End Date', type: 'text', name: 'endDate',placeholder: 'Select End Date', validation: ['required'] },
  ];

  fieldsStep3: Field[] = [
    { label: 'Company Name', type: 'text', name: 'idType',  validation: ['required'] },
    { label: 'Start Date', type: 'text', name: 'idNumber', placeholder: 'Enter ID number', validation: ['required'] },
    { label: 'End Date ', type: 'text', name: 'endDate',  validation: ['required'] },
    { label: 'Work Description ', type: 'text', name: 'workDescription',  validation: ['required'] },
    { label: 'Languages', type: 'select', name: 'Languages',placeholder: 'Select languages', options: ['Arabic', 'English', 'Urdu'], validation: ['required'] },
    { label: 'Level', type: 'select', name: 'level',placeholder: 'Select proficiency level', options: ['Begineer', 'Intermediate', 'Expert'], validation: ['required'] },
    { label: 'Availability', type: 'select', name: 'availability',placeholder: 'Select availability', options: ['Part Time', 'Full Time'], validation: ['required'] },
  ];

  fieldsStep4: Field[] = [
    { label: 'Upload Document', type: 'file', name: 'document', validation: ['required'] },
    { label: 'Doc Type', type: 'select', name: 'Languages',placeholder: 'Select Document', options: ['PDF', 'Images', 'Document'], validation: ['required'] },

  ];

  fieldsStep5: Field[] = [
    { label: 'Clothes Size', type: 'select', name: 'documentType', placeholder:'Select Size', options: ['32', '34'], validation: ['required'] },
    { label: 'Shoe Size', type: 'select', name: 'documentType', placeholder:'Select Size', options: ['16', '18'], validation: ['required'] },

  ];

  constructor(
    private fb: FormBuilder,    
    private languageService: LanguageService,
    private jobSchemaService:JobSchemaService
    
    ) {
    this.form = this.fb.group({});  // Initialize an empty form
  }

  ngOnInit() {
    this.createForm();  // Initialize the form when component is initialized
    this.getApi();
  }



  getApi() {

    this.languageService.currentLang$.pipe(take(1)).subscribe((lang: string) => {
      this.jobSchemaService.getConfig('apply/schema', lang).subscribe(
        (data) => {
          this.jobSchemaData = data;
          // this.transformDataForTable(this.configData);
          console.log('API response:', this.jobSchemaData);
        },
        (error) => {
          console.error('Error fetching config:', error);
        }
      );
    });
  }

  handleSelectionChange(selectedItems: DropdownItem[]) {
    console.log('Updated selected items:', selectedItems);
  }

  createForm() {
    const formControls: { [key: string]: any } = this.form.getRawValue(); // Retain previous form values

    // Get the fields for the current step
    const fields = this.getCurrentStepFields();
    fields.forEach((field) => {
      // Add the form control for the current field if it does not already exist
      if (!this.form.contains(field.name)) {
        const validators = this.getValidators(field.validation);
        formControls[field.name] = ['', validators];
      }
    });

    // Rebuild the form with all controls from previous and current steps
    this.form = this.fb.group(formControls);
  }

  getValidators(validations: string[]): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    validations.forEach((validation) => {
      if (validation === 'required') validators.push(Validators.required);
      if (validation.startsWith('pattern')) {
        const pattern = validation.split(':')[1];
        validators.push(Validators.pattern(pattern));
      }
      if (validation === 'email') validators.push(Validators.email);
    });
    return validators;
  }

  handleJobTitleSelected(jobTitle: DropdownItem[]) {
    console.log(jobTitle)
    this.selectedJobTitle = jobTitle;
    console.log('Received Job Title from Child:', this.selectedJobTitle);
  }

  getCurrentStepFields() {
    if (this.currentStep === 1) return this.fieldsStep1;
    if (this.currentStep === 2) return this.fieldsStep2;
    if (this.currentStep === 3) return this.fieldsStep3;
    if (this.currentStep === 4) return this.fieldsStep4;
    if (this.currentStep === 5) return this.fieldsStep5;
    return [];
  }

  isCurrentStepValid(fields: any[]): boolean {
    const formValue = this.form.getRawValue(); // Get all form values including previous steps

    console.log(formValue);  // Log the form value to ensure all fields are populated

    return fields.every((field) => {
      const value = formValue[field.name];
      console.log(`Field Name: ${field.name}, Value: ${value}`); // Log field names and their values

      if (field.validation.includes('required')) {
        // Ensure value is a string before calling trim
        return value && (typeof value === 'string' ? value.trim() !== '' : value !== null && value !== undefined); // Check for required fields
      }
      
      return true;
    });
  }

  onStepChange(step: number) {
    const fields = this.getCurrentStepFields();
    const isStepValid = this.isCurrentStepValid(fields);

    console.log(this.getCurrentStepFields(), isStepValid);  // Log the fields and validation result

    if (isStepValid || step < this.currentStep) {
      // Move to the next step
      this.currentStep = step;
      this.createForm();  // Add the fields for the next step, preserving previous data
      console.log(fields);
    } else {
      console.log(this.toast)
      this.toast.info('Please complete all required fields in the current step');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted successfully!', this.form.value); // This will contain data from all steps
    } else {
      alert('Please complete the form');
    }
  }
}
