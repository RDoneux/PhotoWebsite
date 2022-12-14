import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Modal } from './modal.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: Subject<Modal> = new Subject();

  constructor() {}

  createModal(
    title: string,
    body: string,
    close: boolean = true,
    confirm: string = '',
    cancel: string = ''
  ) {
    this.modals.next({ id: uuid.v4(), title, body, close, confirm, cancel });
  }

  getModals() {
    return this.modals;
  }
}
