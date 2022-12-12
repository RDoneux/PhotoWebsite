import { Component } from '@angular/core';
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

  constructor(private service: ContactService) {}

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
    console.log(this.contactEmail, ' : ', this.subject, ' : ', this.message);
    if (!this.contactEmail || !this.subject || !this.message) return;
    this.service
      .postMessage({
        contact_email: this.contactEmail,
        subject: this.subject,
        message: this.message,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }
}
