import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../lang.service';
import { Router } from '@angular/router';

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

  constructor(
    private languageService: LanguageService,
    private router: Router) {}

  async ngOnInit() {
    this.languageService.currentSidebar.subscribe((sidebar) => {
      this.sidebar = sidebar;
    });

    this.languageService.loadSidebar();
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
