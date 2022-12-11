import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  constructor(private http: HttpClient) {
    // this.http
    //   .get('api/images', {
    //     headers: {
    //       Authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6IkRldmVsb3BtZW50IiwicHJpdmlsYWdlcyI6WyJ2aXNpdG9yIiwiYWRtaW4iXSwiaWF0IjoxNjcwMzUzMjcyfQ.fYffB5KH2YOiZ9gh-tRBzfTkh45xqwopouE1S-O91LY',
    //     },
    //   })
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response);
    //     },
    //   });
    // this.http
    //   .post(
    //     'api/collections',
    //     {
    //       images: ['638f9246c30ee48bf2bc4da1', '638f9967b0f6c1389fd058b3'],
    //     },
    //     {
    //       headers: new HttpHeaders({
    //         Authorization:
    //           'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6IkRldmVsb3BtZW50IiwicHJpdmlsYWdlcyI6WyJ2aXNpdG9yIiwiYWRtaW4iXSwiaWF0IjoxNjcwMzUzMjcyfQ.fYffB5KH2YOiZ9gh-tRBzfTkh45xqwopouE1S-O91LY',
    //       }),
    //     }
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response);
    //     },
    //   });
  }

  uploadFile(eventTarget: EventTarget | null) {
    if (!eventTarget) return;
    // console.log((eventTarget as HTMLInputElement).files);

    // const images: any[] = [
    //   {
    //     title: 'title 1',
    //     author: 'author 1',
    //     date_taken: 'date taken 1',
    //     url: 'url 1',
    //     selected: true,
    //     collections: ['collection 1 1', 'collection 1 2', 'collection 1 3'],
    //   },
    //   {
    //     title: 'title 2',
    //     author: 'author 2',
    //     date_taken: 'date taken 2',
    //     url: 'url 2',
    //     selected: false,
    //     collections: ['collection 2 1', 'collection: 2 2'],
    //   },
    // ];

    const files = (eventTarget as HTMLInputElement).files;

    if (!files) return;

    const form: FormData = new FormData();

    for (var i = 0; i < files.length; i++) {
      form.append(files[i].name, files[i]);
    }

    this.http
      .post('api/images', form, {
        headers: new HttpHeaders({
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6IkRldmVsb3BtZW50IiwicHJpdmlsYWdlcyI6WyJ2aXNpdG9yIiwiYWRtaW4iXSwiaWF0IjoxNjcwMzUzMjcyfQ.fYffB5KH2YOiZ9gh-tRBzfTkh45xqwopouE1S-O91LY',
        }),
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });

  }
}
