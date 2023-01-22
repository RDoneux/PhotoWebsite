import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  convertBytesToMegaBytes(bytes: number): string {
    var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
      i = 0;
    while (bytes > 900) {
      bytes /= 1024;
      i++;
    }
    var exactSize = Math.round(bytes * 100) / 100 + ' ' + fSExt[i];
    return exactSize
  }
}
