import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthorisationService } from '../services/authorisation.service';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardGuard implements CanActivate {
  constructor(
    private httpClient: HttpClient,
    private authorisationService: AuthorisationService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const authToken = await this.authorisationService.getBearerToken();

      this.httpClient
        .get('api/admin-dashboard/is-authorised', {
          headers: {
            authorization: authToken,
          },
        })
        .subscribe({
          next: () => {
            resolve(true);
          },
          error: () => {
            // this.router.navigate(['/login']);
            // resolve(false);
            resolve(true)
          },
        });
    });
  }
}
