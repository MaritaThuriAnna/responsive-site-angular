import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { LanguageService } from '../../lang.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: Observable<any>;
  isLogged = false;
  private userToken: string | null = null;

  userData: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
    preferredTheme: 'light', // Default theme
    preferredLanguage: 'en', // Default language
  };

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public ngZone: NgZone,
    public router: Router,
    public languageService: LanguageService
  ) {
    // Subscribe to auth state changes
    this.afAuth.authState.subscribe(async (user) => {
      if (user && user.emailVerified) {
        const userRef = this.afs.doc<User>(`users/${user.uid}`);
        const userDoc = await userRef.ref.get();

        if (userDoc.exists) {
          this.userData = userDoc.data() as User;
          this.saveUserLocally(this.userData);
        }

        this.isLogged = true;
        this.userToken = await user.getIdToken();

        // Apply stored preferences
        this.applyUserPreferences();
      } else {
        this.userToken = null;
        this.isLogged = false;
      }
    });


    this.authState = this.afAuth.authState;
  }

  //  Sign in with email/password
  async SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        if (result.user?.emailVerified) {
          this.userToken = await result.user.getIdToken();

          //  Retrieve user details from Firestore
          const userRef = this.afs.doc<User>(`users/${result.user.uid}`);
          const userDoc = await userRef.ref.get();

          if (userDoc.exists) {
            this.userData = userDoc.data() as User;
            this.saveUserLocally(this.userData);
            console.log("User Data Retrieved:", this.userData);

            //  Apply Preferences Immediately
            this.applyUserPreferences();
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

  // Get stored user
  getStoredUser(): User | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  // Save user data in localStorage
  private saveUserLocally(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Check if authenticated
  async isAuthenticated(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.userToken = await user.getIdToken();
      return !!this.userToken;
    }
    return false;
  }

  // Get token
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

        // Get default browser preferences
        const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        const defaultLang = navigator.language.split('-')[0] || "en";

        // Save user in Firestore with preferences
        this.SetUserDataSignUp(result.user, username, defaultTheme, defaultLang);

        alert(' Verification email sent! Check your inbox.');
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        alert(error.message);
      });
  }

  // Save user data on signup
  SetUserDataSignUp(user: any, username: string, theme: string, lang: string) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: username,
      photoURL: user.photoURL || '',
      emailVerified: user.emailVerified,
      preferredTheme: theme as 'light' | 'dark',
      preferredLanguage: lang
    };

    return userRef.set(this.userData, { merge: true });
  }

  //  Save user preferences in Firestore
  async saveUserPreferences(preferredTheme: 'light' | 'dark', preferredLanguage: string) {
    const user = this.userData;
    if (user && user.uid) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

      await userRef.set(
        {
          ...user,
          preferredTheme,
          preferredLanguage
        }, { merge: true }
      );

      //  Update local storage
      this.userData.preferredTheme = preferredTheme;
      this.userData.preferredLanguage = preferredLanguage;
      this.saveUserLocally(this.userData);

      console.log(" Preferences saved:", { preferredTheme, preferredLanguage });
    }
  }


  //  Apply stored preferences (Theme & Language)
  applyUserPreferences() {
    console.log("Applying preferences...");

    if (this.userData.preferredTheme) {
      document.documentElement.setAttribute('data-theme', this.userData.preferredTheme);
      console.log(" Applied Theme:", this.userData.preferredTheme);
    }

    if (this.userData.preferredLanguage) {
      this.languageService.changeLanguage(this.userData.preferredLanguage);
      console.log(" Applied Language:", this.userData.preferredLanguage);
    }
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
      document.documentElement.setAttribute('data-theme', 'light');
      this.languageService.changeLanguage('en')
      
      this.router.navigate(['/login']);
    });
  }
}

