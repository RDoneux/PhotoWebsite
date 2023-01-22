import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDragDropFileUpload]',
})
export class DragDropFileUploadDirective {
  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') background = '#ffffff';

  @HostListener('dragover', ['$event']) dragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#e2eefd';
  }

  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#ffffff';
  }

  @HostListener('drop', ['$event']) public drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#ffffff';
    this.fileDropped.emit(event);
  }
}
