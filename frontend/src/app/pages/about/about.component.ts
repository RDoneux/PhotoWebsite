import { Component, OnInit } from '@angular/core';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private service: AboutService) {}

  async ngOnInit() {
    const userData$ = await this.service.getUserData();
    userData$.subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
