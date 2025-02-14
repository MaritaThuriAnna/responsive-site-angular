import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  authState: Observable<any>;
  isLogged = false
  private userToken: string | null = null;

  userData: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false
  };

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public ngZone: NgZone,
    public router: Router
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.userData.displayName = user.displayName ?? '';
        this.userData.email = user.email ?? '';
        this.userData.photoURL = user.photoURL ?? '';
        this.userData.emailVerified = user.emailVerified ?? false;

        // localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user')!);
        this.isLogged = true;
        this.userToken = await user.getIdToken();

      } else {
        // localStorage.setItem('user', 'null');
        // JSON.parse(localStorage.getItem('user')!);
        // localStorage.removeItem('user');
        this.userToken = null;
        this.isLogged = false;
      }
    });
    this.authState = this.afAuth.authState;
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        if (result.user?.emailVerified) {
          this.userToken = await result.user.getIdToken();
          console.log(" Login Successful! Token:", this.userToken);

          // retrieve user details from firestore instead of setting them again
          const userRef = this.afs.doc<User>(`users/${result.user.uid}`);
          const userDoc = await userRef.ref.get();
          if (userDoc.exists) {
            this.userData = userDoc.data() as User;
            localStorage.setItem('user', JSON.stringify(this.userData));
            console.log(this.userData)
          }

          this.router.navigate(['/']);
        } else {
          alert(' Please verify your email before logging in.');
          this.SignOut();
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  getStoredUser(): User | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.userToken = await user.getIdToken();
      return !!this.userToken;
    }
    return false;
  }

  async getToken(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.userToken = await user.getIdToken(true);
      return this.userToken;
    }
    return null;
  }


  // Sign up with email/password
  async SignUp(email: string, password: string, username: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        await result.user?.sendEmailVerification();
        this.SetUserDataSignUp(result.user, username);
        alert('Verification email sent! Check your inbox.');
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        alert(error.message);
      });
  }

  SetUserDataSignUp(user: any, username: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    this.userData.uid = user.uid,
      this.userData.email = user.email,
      this.userData.displayName = username,
      this.userData.photoURL = user.photoURL || '',
      this.userData.emailVerified = user.emailVerified

    return userRef.set(this.userData, { merge: true });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  isLoggedIn(): boolean {
    // const user = JSON.parse(localStorage.getItem('user')!);
    // return user !== null && user.emailVerified !== false ? true : false;
    return this.isLogged;
  }



  // Sign out
  async SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userToken = null;
      this.router.navigate(['/login']);
    });
  }
}