import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfigService } from '@core/services/config.service';
import { NgSelectComponent } from '@shared/reuseableComponents/elements/ngSelect.component';
import { InputComponent } from '@shared/reuseableComponents/elements/input.components';
import { ButtonComponent } from '@shared/reuseableComponents/elements/button.component';
import { ToastrService } from 'ngx-toastr';
import { DataTableComponent } from '@shared/reuseableComponents/data-table/data-table.component';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '@shared/reuseableComponents/modal/modal.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LanguageService } from '@core/services/language.service';
import { Subscription, debounceTime, forkJoin, take } from 'rxjs';

interface DropdownItem {
  item_id: number;
  item_text: string;
}

interface Pagination {
  start: number;
  end: number;
  total: number;
  pages: number[];
  currentPage: number;
}

interface Language {
  language: {
    display_name: string;
  };
}

interface ConfigItem {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: {
    name: string;
  };
  mobile_number: string;
  languages: Language[];
}

interface TableData {
  id: number;
  FullName: string;
  Dob: string;
  Nationality: string;
  Mobile: string;
  Language: string;
}

@Component({
  selector: 'app-job-listing',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf, NgSelectComponent,AngularSvgIconModule, InputComponent, ButtonComponent,DataTableComponent,NgFor,ModalComponent],
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.scss'
})
export class JobListingComponent implements OnInit {
  form!: FormGroup;
  entityType: any;
  entityData: any;
  isEditMode = false;
  isDeleteMode = false;
  isEditId:any;
  tableBody: any;
  entityId: string | null = null;
  langTypeList: DropdownItem[] = [];
  selectedItems: DropdownItem[] = [];
  tableHeader:any;
  tableColumn:any;
  tableData: any[] = [];
  private langChangeSubscription!: Subscription;
  isModalOpen: boolean = false;  // Modal visibility controlled here
  modalTitle: string = '';  // Title passed to modal
  modalContent: string = `'This is some important information inside the modal.'`;  // Content passed to modal
  modalButtonText: string = 'Submit';  // Button text passed to modal
  pagination: Pagination = {
    start: 1,
    end: 10,
    total: 100, // Make sure to set this based on the actual total data
    pages: [1, 2, 3, 4, 5],
    currentPage: 1
  };

  private apiCalled = false; 

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private languageService: LanguageService,
    private configService: ConfigService,
    private toast: ToastrService // injected directly in constructor for better clarity
  ) {}

 ngOnInit(): void {
 
  this.langChangeSubscription = this.languageService.currentLang$
  .pipe(debounceTime(300)) // Wait 300ms to handle rapid changes
  .subscribe((lang: string) => {
    this.getApi(); // Call API only after debounce
  });




  this.route.data.subscribe((data: any) => {
    this.entityType = data?.type;
    if (this.entityType) {
      this.getApi();
    } else {
      console.error('Entity Type is not defined');
    }
  });
    this.langTypeList = [
      { item_id: 1, item_text: 'Arabic' },
      { item_id: 2, item_text: 'English' },
    ];

    // Initialize form
    this.form = this.fb.group({
      language: ['', Validators.required],
      displayName: ['', Validators.required],
    });

    // Fetch entity ID from route params
    this.route.paramMap.subscribe((params) => {
      this.entityId = params.get('id');
      if (this.entityId && !this.apiCalled) {
        this.isEditMode = true;
        // this.loadEntityData();
        this.apiCalled = true;  // Prevent multiple calls
      }
    });
  }


  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

 
  openModal(rowData?: any, type?: string) {
    this.isModalOpen = true; 
    const titleMap: { [key: string]: string } = {
      'Add': 'Add',
      'Edit': 'Edit',
      'Delete': 'Delete'
    };
  
    this.modalTitle = titleMap[type as keyof typeof titleMap] || 'Title';

    const isEditing = Boolean(rowData);
    
    if (isEditing) {
      this.isEditMode = true;
      this.isDeleteMode = false;
  
      // Pre-fill form with rowData
      this.form.patchValue({
        id: rowData.id,
        language: rowData.language === 'ar' ? 'Arabic' : 'English',
        displayName: rowData.display_name,
      });
    } else {
      if(this.modalTitle === 'Add'){
        this.isEditMode = false;
        this.isDeleteMode = false;
      }else{
        this.isEditMode = false;
        this.isDeleteMode = true;
      }
      // Reset form if no rowData
      this.form.reset();
    }
  }
  

  closeModal() {
    this.isModalOpen = false;  // Set modal state to closed
  }

  onConfirm() {
    console.log('Modal confirmed');
    this.closeModal();  // Close modal after confirmation
  }

  // Fetch config data based on entity type
  getApi() {
    if (!this.entityType) {
      console.error('Entity type is not defined!');
      return;
    }
  
    // Subscribe once to currentLang$
    this.languageService.currentLang$.pipe(take(1)).subscribe((lang: string) => {
      // Create two observables for fetching the table header and body
      const headerObservable = this.configService.getConfig(`fields/${this.entityType}/list_type`, lang);
      const bodyObservable = this.configService.getConfig(this.entityType, lang);
  
      // Use forkJoin to execute both API calls concurrently
      forkJoin([headerObservable, bodyObservable]).subscribe(
        ([headerData, bodyData]) => {
          // Process header data
          if (headerData?.model === this.entityType) {
            // tableHeader will contain the dynamic fields, use it directly
            this.tableHeader = headerData.fields.map((item:any)=> item.verbose_name);
            this.tableColumn = headerData.fields.map((item:any)=> item.name);

            console.log('API response: Header', this.tableHeader);
          }
  
          // Process table body data
          this.tableBody = bodyData;
          console.log(this.tableBody,'body')
          this.transformDataForTable(this.tableBody.results);
          console.log('API response: Body', this.tableBody);
        },
        (error) => {
          console.error('Error fetching config:', error);
        }
      );
    });
  }


  transformDataForTable(tableBody: any) {
    this.tableData = tableBody?.map((item: any) => {
      const row: any = {};
      this.tableColumn.forEach((col: string) => {
        if (item[col] && typeof item[col] === 'object') {
          row[col] = item[col].key ? item[col].key :
          item[col].name ? item[col].name :
          item[col].display_name ? item[col].display_name : ''
        } else {
          row[col] = item[col];
        }
      });
      return row;
    });
  
    this.pagination.total = this.tableBody.count;
    this.updatePagination();
  }
  
  


  handleAction(event: { action: string, rowData: any }) {
    if (event.action === 'edit') {
      this.openModal(event.rowData,'Edit');
      this.isEditId = event.rowData.id
      console.log(event.action)
    } else if(event.action === 'delete'){
      this.openModal('','Delete');
      this.isEditId = event.rowData.id
    }
  }
  
  editRow(rowData: any) {
    console.log('Edit row:', rowData);
    this.form.patchValue({
      id:rowData.id,
      language: rowData.language === 'ar' ? 'Arabic' : 'English',
      displayName: rowData.display_name,
    });
  }

  updatePagination() {
    const totalPages = Math.ceil(this.pagination.total / 10);
    this.pagination.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    const start = (this.pagination.currentPage - 1) * 10;
    const end = this.pagination.currentPage * 10;
    this.pagination.start = start + 1;
    this.pagination.end = end > this.pagination.total ? this.pagination.total : end;
    this.tableData = this.tableData?.slice(start, end);
  }

  onPageChange(page: number) {
    console.log(page)
    // this.pagination.currentPage = page;
    // this.updatePagination();
  }

  onNextPage() {
    if (this.pagination.currentPage < this.pagination.pages.length) {
      this.pagination.currentPage++;
      this.updatePagination();
    }
  }

  onPreviousPage() {
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage--;
      this.updatePagination();
    }
  }


  handleSelectionChange(selectedItems: DropdownItem[]) {
    this.selectedItems = selectedItems;
  }

  onDelete() {
    this.languageService.currentLang$.subscribe((lang: string) => {
    this.configService.deleteConfig(this.entityType, this.isEditId!,lang).subscribe(
      (response) => {
        this.toast.success('Deleted successfully!');
        this.closeModal();
        this.apiCalled = false; 
        this.getApi();
      },
      (error) => {
        this.toast.error('Delete Failed!');
      }
    );
    })
  }

  onSubmit() {
    
    if (this.form.valid) {
      const formData = this.form.value;
      const payload = {
        translations: [
          {
            language: 'ar',
            display_name: formData.displayName,
          },
          {
            language: formData.language[0].item_text === 'Arabic' ? 'ar' : 'en',
            display_name: formData.displayName,
          },
        ],
      };

      if (this.isEditMode) {
        this.languageService.currentLang$.subscribe((lang: string) => {
        this.configService.updateConfig(this.entityType, this.isEditId!, payload,lang).subscribe(
          (response) => {
            this.toast.success('Updated successfully!');
            this.closeModal();
            this.apiCalled = false;  
            this.getApi(); 
          },
          (error) => {
            this.toast.error('Update Failed!');
          }
        );
        });
      } else {
        this.languageService.currentLang$.subscribe((lang: string) => {
        this.configService.createConfig(this.entityType, payload,lang).subscribe(
          (response) => {
            this.toast.success(`${this.entityType} Created successfully!`);
            this.closeModal();
            this.apiCalled = false;  
            this.getApi(); 
          },
          (error) => {
            this.toast.error('Creation Failed!');
          }
        );
        })
      }
    }
  }
  
}
