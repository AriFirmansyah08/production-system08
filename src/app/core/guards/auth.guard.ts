import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private AuthenticationService: AuthenticationService, private router: Router) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree {
        if (this.AuthenticationService.isAuthenticated()) {
          return true;
        } else {
          // Jika pengguna belum login, arahkan mereka ke halaman login
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          return false
        }
      }
}
