import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../lang.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {
  sidebar: any[] = [];
  isExpanded = true;
  dropdowns: { [key: string]: boolean } = {};

  primaryColor = '#fffaeb';
  fontFamily = 'Arial';
  isDarkMode = false;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private themeService: ThemeService) { }

  async ngOnInit() {
    this.languageService.currentSidebar.subscribe((sidebar) => {
      this.sidebar = sidebar;
      console.log(" Sidebar Loaded:", this.sidebar);
    });

    this.languageService.loadSidebar();

    this.themeService.darkMode.subscribe(isDark => {
      this.isDarkMode = isDark;
      console.log(" Theme Mode:", isDark ? "Dark" : "Light");
    });

    // Ensure sidebar is always displayed
    this.sidebar = this.sidebar.length > 0 ? this.sidebar : [{ label: "Home", path: "/" }];
  }



  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleDropdown(label: string) {
    this.dropdowns[label] = !this.dropdowns[label];
  }
}
