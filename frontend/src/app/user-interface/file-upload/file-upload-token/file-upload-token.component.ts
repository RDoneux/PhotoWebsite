import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { UploadFile } from '../file-upload.model';

@Component({
  selector: 'app-file-upload-token',
  templateUrl: './file-upload-token.component.html',
  styleUrls: ['./file-upload-token.component.scss'],
})
export class FileUploadTokenComponent implements OnInit {
  @Input() file: UploadFile | undefined = undefined;
  @Output() onRemoved: EventEmitter<string> = new EventEmitter();

  loading: boolean = true;
  bytes: string = '';

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    if (!this.file) return;
    this.bytes = this.utilsService.convertBytesToMegaBytes(this.file.size);
  }

  removed() {
    if (!this.file) return;
    this.onRemoved.emit(this.file.id);
  }
}
