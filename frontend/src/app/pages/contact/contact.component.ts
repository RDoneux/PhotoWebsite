import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  name: string | undefined = undefined;
  subject: string | undefined = undefined;
  message: string | undefined = undefined;

  onNameChange(event: string) {
    this.name = event;
  }

  onSubjectChange(event: string) {
    this.subject = event;
  }

  onMessageChange(event: string) {
    this.message = event;
  }

  onSubmit() {
    console.log(this.name, ' : ', this.subject, ' : ', this.message);
  }
}
