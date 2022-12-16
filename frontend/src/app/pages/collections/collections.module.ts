import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { NavBarModule } from 'src/app/user-interface/nav-bar/nav-bar.module';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { CollectionModule } from 'src/app/common/collection/collection.module';

@NgModule({
  declarations: [CollectionsComponent],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    NavBarModule,
    PageTitleModule,
    CollectionModule,
  ],
})
export class CollectionsModule {}
