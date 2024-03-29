import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './user-interface/nav-bar/nav-bar.module';
import { AuthorisationService } from './services/authorisation.service';
import { ModalModule } from './common/modal/modal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardGuard } from './guards/admin-dashboard.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NavBarModule,
    ModalModule,
  ],
  providers: [AdminDashboardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private authorisationService: AuthorisationService) {
    this.authorisationService.requestAuthorisation();
  }
}
