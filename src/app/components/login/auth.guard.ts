import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Auth, user } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    // 
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return from(this.authService.isAuthenticated()).pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true; 
        } else {
          this.router.navigate(['/login']); 
          return false;
        }
      })
    );
  }
}
