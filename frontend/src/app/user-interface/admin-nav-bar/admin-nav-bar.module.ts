import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavBarComponent } from './admin-nav-bar.component';
import { RouterModule } from '@angular/router';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
  declarations: [AdminNavBarComponent],
  imports: [CommonModule, RouterModule, NavBarModule],
  exports: [AdminNavBarComponent],
})
export class AdminNavBarModule {}
