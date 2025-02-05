import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';
import { LanguageService } from '../../lang.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  sidebar: any[] = [];
  isExpanded = true;
  dropdowns: { [key: string]: boolean } = {};

  private configService = inject(ConfigService);
  constructor(private languageService: LanguageService) {}

  async ngOnInit() {
    this.languageService.currentSidebar.subscribe((sidebar) => {
      this.sidebar = sidebar;
    });

    this.languageService.loadSidebar();
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleDropdown(label: string) {
    this.dropdowns[label] = !this.dropdowns[label];
  }
}
