import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  @Input() label: string | undefined = undefined;

  @Input() placeholder: string = '';
  @Input() value: string | undefined = undefined;

  @Output() valueChanged: EventEmitter<string> = new EventEmitter();

  onModelChanged(value: string) {
    this.value = value;
    this.valueChanged.emit(this.value);
  }
}
