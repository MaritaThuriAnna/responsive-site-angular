import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';

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

  private configService = inject(ConfigService);

  async ngOnInit() {
    try {
      await this.configService.loadConfig(); // ✅ Load config first
      this.sidebar = this.configService.getSidebar(); // ✅ Now get the sidebar data
      console.log("Sidebar Data Loaded:", this.sidebar);
    } catch (error) {
      console.error('Error loading sidebar configuration:', error);
    }
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleDropdown(label: string) {
    this.dropdowns[label] = !this.dropdowns[label];
  }
}
