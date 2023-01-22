import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputModule } from './text-input/text-input.module';
import { TextAreaModule } from './text-area/text-area.module';
import { ButtonModule } from './button/button.module';
import { LoadingSpinnerModule } from './loading-spinner/loading-spinner.module';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    TextInputModule,
    TextAreaModule,
    ButtonModule,
    LoadingSpinnerModule,
    NavBarModule,
    TextAreaModule,
    FileUploadModule,
  ],
})
export class UserInterfaceModule {}
