import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'image-upload', loadChildren: () => import('./image-manager/image-upload.module').then(m => m.ImageManagerModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
