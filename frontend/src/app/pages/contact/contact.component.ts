import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactEmail: string | undefined = undefined;
  subject: string | undefined = undefined;
  message: string | undefined = undefined;

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
  }
}
