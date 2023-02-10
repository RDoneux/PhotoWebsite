import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageUploadRoutingModule } from './image-upload-routing.module';
import { ImageUploadComponent } from './image-upload.component';
import { FileUploadModule } from 'src/app/user-interface/file-upload/file-upload.module';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { AdminNavBarModule } from 'src/app/user-interface/admin-nav-bar/admin-nav-bar.module';

@NgModule({
  declarations: [ImageUploadComponent],
  imports: [
    CommonModule,
    ImageUploadRoutingModule,
    FileUploadModule,
    PageTitleModule,
    AdminNavBarModule,
  ],
})
export class ImageManagerModule {}
