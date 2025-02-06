import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private colorSource = new BehaviorSubject<string>(localStorage.getItem('themeColor') || '#007bff');
  currentColor = this.colorSource.asObservable();

  private fontSource = new BehaviorSubject<string>(localStorage.getItem('themeFont') || 'Arial');
  currentFont = this.fontSource.asObservable();

  private darkModeSource = new BehaviorSubject<boolean>(localStorage.getItem('darkMode') === 'true');
  darkMode = this.darkModeSource.asObservable();

  constructor() {
    this.applyTheme();
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
    localStorage.setItem('darkMode', String(isDark));
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  applyTheme() {
    document.documentElement.style.setProperty('--primary-color', this.colorSource.getValue());
    document.documentElement.style.setProperty('--primary-font', this.fontSource.getValue());
    document.documentElement.setAttribute('data-theme', this.darkModeSource.getValue() ? 'dark' : 'light');
  }
}
