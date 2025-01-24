import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

interface Column {
  name: string;
  prop: string;
}

interface Pagination {
  start: number;
  end: number;
  total: number;
  pages: number[];
  currentPage: number;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, NgxDatatableModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() tableHeaders: string[] = []; // Headers of the table
  @Input() tableColumn?: string[] = [];
  @Input() tableData: any[] = []; // Data to display in rows
  @Input() showCheckboxes: boolean = false; // Show checkboxes or not
  @Input() showPagination: boolean = true; // Show pagination
  @Input() pagination: Pagination = { 
    start: 1, 
    end: 10, 
    total: 1000, 
    pages: [1], 
    currentPage: 1 
  };
  @Input() actions: boolean = true; // Show action column (edit, delete, etc.)
  @Output() onActionClick = new EventEmitter<{ action: string, rowData: any }>(); // Event emitter for actions
  @Output() pageChange = new EventEmitter<number>(); // Event emitter for page changes

  constructor() { }

  ngOnInit(): void { }

  onPreviousPage() {
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage--;
      this.pageChange.emit(this.pagination.currentPage); // Emit the pageChange event
    }
  }

  onNextPage() {
    if (this.pagination.currentPage < this.pagination.pages.length) {
      this.pagination.currentPage++;
      this.pageChange.emit(this.pagination.currentPage); // Emit the pageChange event
    }
  }

  handlePageChange(page: number):void {
    this.pagination.currentPage = page;
    this.pageChange.emit(this.pagination.currentPage); // Emit the pageChange event
  }

  handleAction(action: string, rowData: any, event: Event) {
    event.preventDefault();  // Prevent default click behavior (like navigating)
    this.onActionClick.emit({ action, rowData });
  }
  
}
