import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { UserInterfaceModule } from 'src/app/user-interface/user-interface.module';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    PageTitleModule,
    UserInterfaceModule
  ]
})
export class ContactModule { }
