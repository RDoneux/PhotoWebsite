import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent {
  @Input() label: string | undefined = undefined;
  @Input() placeholder: string = '';
  @Input() value: string | undefined = undefined;

  @Output() valueChanged: EventEmitter<string> = new EventEmitter();

  onModelChanged(value: string) {
    this.value = value;
    this.valueChanged.emit(this.value);
  }
}
