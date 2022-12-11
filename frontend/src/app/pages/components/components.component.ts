import { Component } from '@angular/core';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent {
  /* istanbul ignore file */
  printValueChange(event: string) {
    console.log(event);
  }
}
