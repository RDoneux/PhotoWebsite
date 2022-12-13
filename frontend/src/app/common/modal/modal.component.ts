import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Modal } from './modal.model';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('.2s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ModalComponent implements OnInit {
  modal: Modal | undefined = undefined;

  constructor(private service: ModalService) {}

  ngOnInit(): void {
    this.service.getModals().subscribe({
      next: (modal: Modal) => {
        this.modal = modal;
      },
    });
  }

  closeModal(id: string) {
    this.modal = undefined;
  }
}
