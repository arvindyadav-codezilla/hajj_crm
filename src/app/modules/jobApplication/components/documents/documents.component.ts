import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/reuseableComponents/elements/button.component';
import { InputComponent } from '@shared/reuseableComponents/elements/input.components';
import { SelectComponent } from '@shared/reuseableComponents/elements/select.component';
import { UploadFileComponent } from '@shared/reuseableComponents/uploadFile.component';

@Component({
  selector: 'job-documents',
  standalone: true,
  imports: [CommonModule, FormsModule,InputComponent,SelectComponent,ButtonComponent,UploadFileComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  selectedOption: string = '';
  uploadedFiles: any[] = [];

  onFilesUploaded(files: any[]) {
    this.uploadedFiles = files; // Store the uploaded files
  }
}
