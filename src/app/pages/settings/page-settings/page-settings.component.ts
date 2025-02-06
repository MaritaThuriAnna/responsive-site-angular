import { Component } from '@angular/core';
import { ThemeService } from '../../../theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-settings.component.html',
  styleUrl: './page-settings.component.css'
})
export class PageSettingsComponent {
  colors = ['#00a6ff', '#ff7933', '#19692c', '#cc8100', '#8c68ce'];
  fonts = ['Arial', 'Courier New', 'Georgia', 'Tahoma', 'Verdana'];
  isDarkMode = false;

  constructor(private themeService: ThemeService) {
    // dark mode setting
    this.themeService.darkMode.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  changeColor(color: string) {
    this.themeService.setColor(color);
  }

  changeFont(font: Event) {
    const target = font.target as HTMLSelectElement; 
    const f = target.value;
    this.themeService.setFont(f);
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
