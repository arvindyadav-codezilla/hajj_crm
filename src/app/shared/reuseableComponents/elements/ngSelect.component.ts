import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  IDropdownSettings,
  NgMultiSelectDropDownModule,
} from 'ng-multiselect-dropdown';

interface DropdownItem {
  item_id: number;
  item_text: string;
}

@Component({
  selector: 'ng-select',
  standalone: true,
  imports: [FormsModule, CommonModule, NgMultiSelectDropDownModule],
  template: ` <div class="flex flex-col">
    <label *ngIf="label" class="mb-2">{{ label }}</label>
    <ng-multiselect-dropdown
      [placeholder]="placeholder"
      [settings]="dropdownSettings"
      [data]="dropdownList"
      [(ngModel)]="selectedItems"
      (onSelect)="onItemSelect($event)"
      class="selectbox"
      (onSelectAll)="onSelectAll($event)"
    >
    </ng-multiselect-dropdown>
  </div>`,
  styles: [
    `
      ::ng-deep .multiselect-dropdown .selected-item {
        background: #b49164 !important;
        border-color: #b49164 !important;
        max-width: max-content !important;
      }
      ::ng-deep .multiselect-dropdown .selected-item:hover {
        box-shadow: none !important;
      }

      ::ng-deep .multiselect-dropdown .dropdown-btn {
        border-color: #eff0f6 !important;
        min-height: 50px !important;
        display: flex !important;
        align-items: center;
      }
      ::ng-deep .multiselect-dropdown .dropdown-btn > span {
        color: #6f6c90 !important;
      }

      ::ng-deep .multiselect-item-checkbox > div {
        // padding-left: 0px !important;
      }
      ::ng-deep .multiselect-item-checkbox > div:before {
        background: #fff !important;
        color: #b49164 !important;
        border-color: #b49164 !important;
      }
      ::ng-deep
        .multiselect-item-checkbox
        input[type='checkbox']:checked
        + div:before {
        animation: 0.2s ease-in !important;
        background: #337ab7;
      }
      ::ng-deep .multiselect-item-checkbox > div:after {
        // display: none !important;
        color: #b49164 !important;
        border-color: #b49164 !important;
      }
      ::ng-deep .multiselect-dropdown .dropdown-multiselect__caret {
        top: 7px !important;
      }
      ::ng-deep .multiselect-dropdown .dropdown-multiselect__caret:before {
        background: url('/assets/icons/downArrow.svg') no-repeat center center;
        border-color: transparent !important;
        height: 100%;
        width: 100%;
        display: block;
        background-size: auto;
        border: none !important;
        top: -5px !important;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgSelectComponent),
      multi: true,
    }
  ]
})
export class NgSelectComponent {
  @Input() dropdownList: DropdownItem[] = [];
  @Input() selectedItems: DropdownItem[] = [];
  @Input() singleSelection: boolean = true;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() dropdownSettings: IDropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
  };

  @Output() onSelectionChange = new EventEmitter<DropdownItem[]>();

  // Implement ControlValueAccessor methods
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.dropdownSettings.singleSelection = this.singleSelection;
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedItems = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // This can be used to disable the dropdown if necessary
  }

  onItemSelect(item: any): void {
    console.log('Selected item:', item);
    this.emitSelection();
  }

  onSelectAll(items: any): void {
    console.log('All selected items:', items);
    this.emitSelection();
  }

  emitSelection(): void {
    this.onSelectionChange.emit(this.selectedItems);
    this.onChange(this.selectedItems); // Notify Angular form about the change
  }
}
