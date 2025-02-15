import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './components/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private colorSource = new BehaviorSubject<string>(localStorage.getItem('themeColor') || '#007bff');
  currentColor = this.colorSource.asObservable();

  private fontSource = new BehaviorSubject<string>(localStorage.getItem('themeFont') || 'Arial');
  currentFont = this.fontSource.asObservable();
  private darkModeSource = new BehaviorSubject<boolean>(false);
  darkMode = this.darkModeSource.asObservable();

  constructor(private authService: AuthService) {
    this.loadUserPreferences();
  }
  setColor(color: string) {
    this.colorSource.next(color);
    localStorage.setItem('themeColor', color);
    document.documentElement.style.setProperty('--primary-color', color);
  }

  setFont(font: string) {
    this.fontSource.next(font);
    localStorage.setItem('themeFont', font);
    document.documentElement.style.setProperty('--primary-font', font);
  }
  toggleDarkMode() {
    const isDark = !this.darkModeSource.getValue();
    this.darkModeSource.next(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

    // Save preference to Firestore
    const themePreference = isDark ? 'dark' : 'light';
    this.authService.saveUserPreferences(themePreference, this.authService.userData.preferredLanguage ?? 'en');
  }

  async loadUserPreferences() {
    const user = this.authService.getStoredUser();
    if (user) {
      if (user.preferredTheme) {
        this.setDarkMode(user.preferredTheme === 'dark');
        console.log(" Loaded saved theme:", user.preferredTheme);
      }
    }
  }

  setDarkMode(isDark: boolean) {
    this.darkModeSource.next(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
}
