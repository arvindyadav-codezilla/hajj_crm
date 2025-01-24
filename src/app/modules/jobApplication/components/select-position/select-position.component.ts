import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '@shared/reuseableComponents/elements/button.component';
import { InputComponent } from '@shared/reuseableComponents/elements/input.components';
import { NgSelectComponent } from '@shared/reuseableComponents/elements/ngSelect.component';
import { SelectComponent } from '@shared/reuseableComponents/elements/select.component';

interface DropdownItem {
  item_id: number;
  item_text: string;
}

@Component({
  selector: 'job-select-position',
  standalone: true,
  imports: [TranslateModule,ButtonComponent,SelectComponent,InputComponent,FormsModule,NgSelectComponent],
  templateUrl: './select-position.component.html',
  styleUrl: './select-position.component.scss',
})
export class SelectPositionComponent {
  dropdownList: DropdownItem[] = [];
  selectedItems: DropdownItem[] = [];
  dropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false
  };

  isSingleSelection: boolean = true;

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Management' },
      { item_id: 2, item_text: 'Driver' },
      { item_id: 3, item_text: 'Staff' }
    ];

    // this.selectedItems = [{ item_id: 2, item_text: 'Bangalore' }];
  }

  handleSelectionChange(selectedItems: DropdownItem[]) {
    this.selectedItems = selectedItems;
  }

  toggleSelectionMode() {
    this.isSingleSelection = !this.isSingleSelection;
  }

  selectedValue:string = ''
  @Output() jobTitleSelected = new EventEmitter<DropdownItem[]>();

  logSelectedJobTitle() {
    this.jobTitleSelected.emit(this.selectedItems);
  }

}
