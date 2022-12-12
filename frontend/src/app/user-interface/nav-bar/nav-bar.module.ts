import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { RouterModule } from '@angular/router';
import { NavBarBreakComponent } from './nav-bar-break/nav-bar-break.component';

@NgModule({
  declarations: [NavBarComponent, NavBarBreakComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavBarComponent],
})
export class NavBarModule {}
