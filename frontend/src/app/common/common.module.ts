import { NgModule } from '@angular/core';
import { ModalModule } from './modal/modal.module';
import { PageTitleComponent } from './page-title/page-title.component';
import { PageTitleModule } from './page-title/page-title.module';

@NgModule({
  declarations: [PageTitleComponent],
  imports: [CommonModule],
  exports: [PageTitleModule, ModalModule],
})
export class CommonModule {}
