import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Auth, user } from '@angular/fire/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    // 
  constructor(private authService: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return user(this.authService).pipe(
      map((currentUser) => {
        if (currentUser) {
          return true; 
        } else {
          this.router.navigate(['/login']); 
          return false;
        }
      })
    );
  }
}
