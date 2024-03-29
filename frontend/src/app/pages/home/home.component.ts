import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  backgroundUrl: string = '';

  ngOnInit() {
    this.setUrl('')
  }

  setUrl(url: string) {
    if (url) {
      this.backgroundUrl = url;
    } else {
      this.backgroundUrl = '/assets/home-default.jpg';
    }
  }
}
