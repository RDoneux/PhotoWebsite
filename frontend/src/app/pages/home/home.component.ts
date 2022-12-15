import { Component } from '@angular/core';
import {
  fadeInAnimation,
  fadeInDelayedAnimation,
  showTitleAnimation,
} from './home.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInAnimation, fadeInDelayedAnimation, showTitleAnimation],
})
export class HomeComponent {}
