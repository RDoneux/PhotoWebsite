import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// import { ObjectId } from 'mongodb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  constructor(private http: HttpClient) {
    this.http
      .get('api/images', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6IkRldmVsb3BtZW50IiwicHJpdmlsYWdlcyI6WyJ2aXNpdG9yIiwiYWRtaW4iXSwiaWF0IjoxNjcwMzUzMjcyfQ.fYffB5KH2YOiZ9gh-tRBzfTkh45xqwopouE1S-O91LY',
        },
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });

      // this.http.post("api/collection", {
      //   headers: {
      //     Authorization:
      //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6IkRldmVsb3BtZW50IiwicHJpdmlsYWdlcyI6WyJ2aXNpdG9yIiwiYWRtaW4iXSwiaWF0IjoxNjcwMzUzMjcyfQ.fYffB5KH2YOiZ9gh-tRBzfTkh45xqwopouE1S-O91LY',
      //   },
      //   body: {
      //     images: [new ObjectId("638f9246c30ee48bf2bc4da1"), new ObjectId("638f9967b0f6c1389fd058b3")]
      //   }
      // }).subscribe({
      //   next: (response) => {console.log(response)}
      // })
  }
}
