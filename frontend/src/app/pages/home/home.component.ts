import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        group([
          query('@showTitle', animateChild()),
          query('@fadeInDelayed', animateChild()),
          style({ opacity: 0 }),
          animate('1s .2s', style({ opacity: 1 })),
        ]),
      ]),
    ]),
    trigger('showTitle', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-40px)' }),
        animate(
          '.5s 1.5s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('fadeInDelayed', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s 2s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent {}
