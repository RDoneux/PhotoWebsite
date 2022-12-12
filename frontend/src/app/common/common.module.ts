import { NgModule } from '@angular/core';
import { PageTitleComponent } from './page-title/page-title.component';
import { PageTitleModule } from './page-title/page-title.module';

@NgModule({
  declarations: [PageTitleComponent],
  imports: [CommonModule],
  exports: [PageTitleModule],
})
export class CommonModule {}
