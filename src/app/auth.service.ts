import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/services']);
    }, err => {
      alert('Something went wrong!');
      this.router.navigate(['/']);
    }
    )
  }

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      console.log("registration successfull");
      this.router.navigate(['/login']);
    }, err => {
      alert('Something went wrong!');
      this.router.navigate(['/register']);
    }
    )
  }

  logout(){
    this.fireAuth.signOut().then(()=> {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert('Something went wrong!');
      // this.router.navigate(['/register']);
    }
    )
  }
}
