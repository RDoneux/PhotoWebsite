import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { NavBarModule } from 'src/app/user-interface/nav-bar/nav-bar.module';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';

@NgModule({
  declarations: [CollectionsComponent],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    NavBarModule,
    PageTitleModule,
  ],
})
export class CollectionsModule {}
