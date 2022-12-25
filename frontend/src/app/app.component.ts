import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { fadeAnimation } from './app.component.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation
  ],
})
export class AppComponent {
  /* istanbul ignore file */
  constructor(
    private http: HttpClient,
    private contexts: ChildrenOutletContexts
  ) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
