import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    RouterModule,
  ],
})
export class AdminDashboardModule {}
