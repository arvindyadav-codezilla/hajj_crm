import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/reuseableComponents/elements/button.component';
import { InputComponent } from '@shared/reuseableComponents/elements/input.components';
import { NgSelectComponent } from '@shared/reuseableComponents/elements/ngSelect.component';
import { SelectComponent } from '@shared/reuseableComponents/elements/select.component';

interface DropdownItem {
  item_id: number;
  item_text: string;
}


@Component({
  selector: 'job-personal-details',
  standalone: true,
  imports: [CommonModule, FormsModule,InputComponent,SelectComponent,ButtonComponent,NgSelectComponent],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss'
})
export class PersonalDetailsComponent {
  selectedOption: string = '';
  idTypeList: DropdownItem[] = [];
  genderList: DropdownItem[] = [];
  nationlityList : DropdownItem[] = [];
  selectedItems: DropdownItem[] = [];

  ngOnInit() {
    this.idTypeList = [
      { item_id: 1, item_text: 'Management' },
      { item_id: 2, item_text: 'Driver' },
      { item_id: 3, item_text: 'Staff' }
    ];

    this.nationlityList = [
      { item_id: 1, item_text: 'Saudi Arabia' },
      { item_id: 2, item_text: 'India' },
      { item_id: 3, item_text: 'USA' }
    ];

    this.genderList = [
      { item_id: 1, item_text: 'Male' },
      { item_id: 2, item_text: 'Female' },
      { item_id: 3, item_text: 'Other' }
    ];


    // this.selectedItems = [{ item_id: 2, item_text: 'Bangalore' }];
  }

  handleSelectionChange(selectedItems: DropdownItem[]) {
    console.log('Updated selected items:', selectedItems);
  }

}
