import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { AdminLoginComponent } from './admin-login.component';
import { FormsModule } from '@angular/forms';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { NavBarModule } from 'src/app/user-interface/nav-bar/nav-bar.module';
import { TextInputModule } from 'src/app/user-interface/text-input/text-input.module';
import { ButtonModule } from 'src/app/user-interface/button/button.module';
import { LoadingSpinnerModule } from 'src/app/user-interface/loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminLoginRoutingModule,
    PageTitleModule,
    NavBarModule,
    ButtonModule,
    TextInputModule,
    LoadingSpinnerModule,
  ],
})
export class AdminLoginModule {}
