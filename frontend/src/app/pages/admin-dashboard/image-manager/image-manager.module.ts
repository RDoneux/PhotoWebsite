import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageManagerRoutingModule } from './image-manager-routing.module';
import { ImageManagerComponent } from './image-manager.component';
import { FileUploadModule } from 'src/app/user-interface/file-upload/file-upload.module';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { AdminNavBarModule } from 'src/app/user-interface/admin-nav-bar/admin-nav-bar.module';

@NgModule({
  declarations: [ImageManagerComponent],
  imports: [
    CommonModule,
    ImageManagerRoutingModule,
    FileUploadModule,
    PageTitleModule,
    AdminNavBarModule,
  ],
})
export class ImageManagerModule {}
