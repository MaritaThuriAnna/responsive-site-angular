import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './components/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private fontSource = new BehaviorSubject<string>(localStorage.getItem('themeFont') || 'Arial');
  currentFont = this.fontSource.asObservable();

  private darkModeSource = new BehaviorSubject<boolean>(
    localStorage.getItem('darkMode') === 'true'
  );
  darkMode = this.darkModeSource.asObservable();

  constructor(private authService: AuthService) {
    this.loadUserPreferences();
  }

  // Set Font
  setFont(font: string) {
    this.fontSource.next(font);
    localStorage.setItem('themeFont', font);
    document.documentElement.style.setProperty('--primary-font', font);

  }

  // Toggle Dark Mode
  toggleDarkMode() {
    const isDark = !this.darkModeSource.getValue();
    this.darkModeSource.next(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('darkMode', String(isDark));

    // Save to Firebase
    this.authService.saveUserPreferences(
      isDark ? 'dark' : 'light',
      this.authService.userData.preferredLanguage ?? 'en',
    );
  }

  // Load Preferences on Login
  async loadUserPreferences() {
    const user = this.authService.getStoredUser();
    if (user) {
      if (user.preferredTheme) this.setDarkMode(user.preferredTheme === 'dark');
    }
  }

  // Apply Dark Mode
  setDarkMode(isDark: boolean) {
    this.darkModeSource.next(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  // Check if Dark Mode is Active
  isDarkMode(): boolean {
    return this.darkModeSource.getValue();
  }
}
