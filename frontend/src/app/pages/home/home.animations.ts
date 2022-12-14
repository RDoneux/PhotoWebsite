import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1s .2s', style({ opacity: 1 })),
  ]),
]);

export const showTitleAnimation = trigger('showTitle', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-40px)' }),
    animate(
      '.5s 1.5s ease-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);

export const fadeInDelayedAnimation = trigger('fadeInDelayed', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.5s 2s', style({ opacity: 1 })),
  ]),
]);
