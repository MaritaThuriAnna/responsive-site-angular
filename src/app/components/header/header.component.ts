import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { config } from 'rxjs';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink], // Include HttpClientModule here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu: any[] = [];

  private configService = inject(ConfigService);

  async ngOnInit() {
    console.log('HeaderComponent initialized.');

    try {
      const config = await this.configService.loadConfig();
      console.log('Config loaded:', config);
      this.menu = config.menu.filter((item: any) => item.enabled);
    } catch (error) {
      console.error('Error loading menu configuration:', error);
    }
  }


}