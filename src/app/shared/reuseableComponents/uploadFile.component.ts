import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from './elements/button.component';


@Component({
  selector: 'file-Upload',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ButtonComponent],
  template: `<div class="file-upload-container">
  <div
    class="dropzone"
    (dragover)="onDragOver($event)"
    (dragleave)="onDragLeave($event)"
    (drop)="onDrop($event)"
    [ngClass]="{ 'dropzone-active': isDragOver }"
  >
    <img src="assets/icons/uploadIcon.svg" />
    <label for="file"><span style="color:#0f0f0f;">Drag & drop files or</span>&nbsp;<span style="color:#B49164;text-decoration:underline">Browse</span></label>
    <input type="file" (change)="onFileChange($event)" multiple id="file" style="display:none"/>
  </div>

  <!-- Display Uploaded Files -->
  <div *ngIf="files.length > 0" class="file-list">
  <h3>Uploaded Files:</h3>
  <ul>
    <li *ngFor="let file of files; let i = index">
      <div *ngIf="isImage(file)">
        <img [src]="file.preview" [alt]="file.name" class="preview-image" />
        <p>{{ file.name }}</p>
        <app-button (click)="removeFile(i)" class="remove-btn">
        Remove Item
        </app-button>
   
      </div>
      <div *ngIf="isPDF(file)">
        <p>{{ file.name }} (PDF)</p>
      </div>
      <!-- Show progress bar for each file being uploaded -->
      <div *ngIf="file.uploading" class="progress-container">
        <div class="progress-bar" [style.width.%]="file.progress"></div>
      </div>
    </li>
  </ul>
</div>
</div>

`,
styles: [
  `
  /* Styling the dropzone */
  .dropzone {
    width: 100%;
    height: 200px;
    border: 2px dashed #B49164;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    cursor: pointer;
    display:flex;
    gap:1rem;
    flex-direction:column;
    transition: background-color 0.3s;
  }
  
  .dropzone-active {
    background-color: #e7f3e7;
  }
  
  .dropzone p {
    font-size: 18px;
    color: #888;
  }
  
  /* Styling the image preview */
  .preview-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    padding:5px;
  }
  
  /* Styling the file list */
  .file-list {
    margin-top: 20px;
  }
  
  .file-list ul {
    list-style: none;
    padding: 0;
    display:flex;
    gap:1rem;
    flex-direction:column;
  }
  
  .file-list li {
    margin: 10px 0;
    border: 2px solid #ccc;
    border-radius: 4px;
    min-height: 100%;
    max-height: 100%;
    position: relative;
  }

  .file-list li > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }



  .remove-btn {
    margin-right: 1rem;
}

  
  `,
],
})
export class UploadFileComponent {
  @Output() filesUploaded = new EventEmitter<any[]>();
  files: any[] = [];  // Store the uploaded files
  isDragOver = false;  // Check if file is being dragged over the dropzone

  // Handle file drop
  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    // Retrieve dropped files
    const droppedFiles = event.dataTransfer.files;
    this.handleFiles(droppedFiles);
  }

  // Handle drag over
  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  // Handle drag leave
  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  // Handle file input change
  onFileChange(event: any) {
    const selectedFiles = event.target.files;
    this.handleFiles(selectedFiles);
  }

  // Process the selected files
  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileReader = new FileReader();

      // Preview images
      if (this.isImage(file)) {
        fileReader.onload = () => {
          this.files.push({
            name: file.name,
            type: file.type,
            preview: fileReader.result,
          });
        };
      } else if (this.isPDF(file)) {
        // Handle PDF file
        this.files.push({ name: file.name, type: file.type });
      }

      // Read the file (for images, will trigger the onload event)
      fileReader.readAsDataURL(file);
    }
    // Emit the files list to the parent component
    this.filesUploaded.emit(this.files);
  }

  // Check if the file is an image
  isImage(file: any): boolean {
    return file.type.startsWith('image/');
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  // Check if the file is a PDF
  isPDF(file: any): boolean {
    return file.type === 'application/pdf';
  }
}
