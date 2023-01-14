import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { Buffer } from 'buffer';
import { AuthorisationService } from 'src/app/services/authorisation.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthorisationService
  ) {}

  username: string = '';
  password: string = '';

  login() {
    if (!this.username || !this.password) {
      return;
    }

    this.httpClient
      .get('api/user', {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(`${this.username}:${this.password}`, 'binary').toString(
              'base64'
            ),
        },
      })
      .subscribe({
        next: (response: any) => {
          this.authService.updateBearerToken(response.data);
          this.router.navigate(['admin-dashboard']);
        },
        error: (error) => console.log(error),
      });
  }

  // this will need to be in the dashboard page eventually
  async createUser() {
    var username = await this.hashString(this.username);
    var password = await this.hashString(this.password);

    this.httpClient
      .post(
        'api/user',
        { username: username, password: password },
        {
          headers: new HttpHeaders({
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6ImFkbWluIGFjY2VzcyIsInByaXZpbGFnZXMiOlsidmlzaXRvciIsImFkbWluIl0sImlhdCI6MTY3MzYyMzQ5MX0.q-BIFQ3B-pqLwEuwy-truuKwxZ9smIcgBhWbKNpXuCM',
          }),
        }
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }

  async hashString(value: string) {
    const saltRounds = 10;
    const hashedString = await new Promise((resolve, reject) => {
      bcrypt.hash(value, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
    return hashedString;
  }
}
