import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar-break',
  templateUrl: './nav-bar-break.component.html',
  styleUrls: ['./nav-bar-break.component.scss']
})
export class NavBarBreakComponent {
  @Input() colour: string | undefined = undefined;
}
