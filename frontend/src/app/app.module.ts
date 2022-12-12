import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './user-interface/nav-bar/nav-bar.module';
import { AuthorisationService } from './services/authorisation.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NavBarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private authorisationService: AuthorisationService) {
    authorisationService.requestAuthorisation();
  }
}
