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
import { take } from 'rxjs';

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

@Component({
  selector: 'app-config-form',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf, NgSelectComponent,AngularSvgIconModule, InputComponent, ButtonComponent,DataTableComponent,NgFor,ModalComponent],
  templateUrl: './config-form.component.html',
  styleUrl: './config-form.component.scss'
})
export class ConfigFormComponent implements OnInit {
  form!: FormGroup;
  entityType: any;
  entityData: any;
  isEditMode = false;
  isDeleteMode = false;
  isEditId:any;
  configData: any;
  entityId: string | null = null;
  langTypeList: DropdownItem[] = [];
  selectedItems: DropdownItem[] = [];
  tableData: any[] = [];
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

  // Load entity data when in edit mode
  // loadEntityData() {
  //   if (!this.entityId) return;
  //   this.languageService.currentLang$.subscribe((lang: string) => {
  //   this.configService.getConfig(this.entityType,lang).subscribe((data) => {
  //     const entity = data.find((item: any) => item.id === this.entityId);
  //     if (entity) {
  //       this.form.patchValue({
  //         language: entity.language,
  //         displayName: entity.displayName,
  //       });
  //     } else {
  //       console.error('Entity not found in data:', this.entityId);
  //     }
  //   });
  // });
  // }


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
    this.languageService.currentLang$.pipe(take(1)).subscribe((lang: string) => {
      this.configService.getConfig(this.entityType, lang).subscribe(
        (data) => {
          this.configData = data.results;
          this.transformDataForTable(this.configData);
          console.log('API response:', this.configData);
        },
        (error) => {
          console.error('Error fetching config:', error);
        }
      );
    });
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

  transformDataForTable(configData: any) {
    console.log(configData)
    this.tableData = configData.map((item: any) => ({
      id: item.id,
      display_name: item.display_name,
    }));
    this.pagination.total = this.tableData.length;
    this.updatePagination();
  }


  updatePagination() {
    const totalPages = Math.ceil(this.pagination.total / 10);
    this.pagination.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    const start = (this.pagination.currentPage - 1) * 10;
    const end = this.pagination.currentPage * 10;
    this.pagination.start = start + 1;
    this.pagination.end = end > this.pagination.total ? this.pagination.total : end;
    this.tableData = this.tableData.slice(start, end);
  }

  onPageChange(page: number) {
    this.pagination.currentPage = page;
    this.updatePagination();
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
