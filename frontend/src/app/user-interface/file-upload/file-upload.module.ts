import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { DragDropFileUploadDirective } from 'src/app/directives/drag-drop/drag-drop-file-upload.directive';
import { FileUploadTokenComponent } from './file-upload-token/file-upload-token.component';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    FileUploadComponent,
    DragDropFileUploadDirective,
    FileUploadTokenComponent,
  ],
  imports: [CommonModule, LoadingSpinnerModule, ButtonModule],
  exports: [FileUploadComponent, DragDropFileUploadDirective],
})
export class FileUploadModule {}
