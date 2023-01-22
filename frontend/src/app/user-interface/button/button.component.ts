import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() disabled: boolean = false;

  @Output() submit: EventEmitter<Date> = new EventEmitter();

  onSubmit() {
    this.submit.emit(new Date());
  }
}
