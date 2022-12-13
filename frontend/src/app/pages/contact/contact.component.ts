import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/common/modal/modal.service';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactEmail: string | undefined = undefined;
  subject: string | undefined = undefined;
  message: string | undefined = undefined;

  constructor(
    private service: ContactService,
    private router: Router,
    private modalService: ModalService
  ) {}

  onContactEmailChange(event: string) {
    this.contactEmail = event;
  }

  onSubjectChange(event: string) {
    this.subject = event;
  }

  onMessageChange(event: string) {
    this.message = event;
  }

  onSubmit() {
    if (!this.contactEmail || !this.subject || !this.message) return;
    this.service
      .postMessage({
        contact_email: this.contactEmail,
        subject: this.subject,
        message: this.message,
      })
      .subscribe({
        next: (response: any) => {
          this.contactEmail = '';
          this.subject = '';
          this.message = '';
          if (response.data.status === 201) {
            this.router.navigate(['/home']);
            this.modalService.createModal(
              'Thank you for your message',
              'I will get back to you as soon as I can',
              true,
              '',
              'Close'
            );
          }
        },
      });
  }
}
