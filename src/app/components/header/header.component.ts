import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { config } from 'rxjs';
import { ConfigService } from '../../config.service';
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import { LanguageService } from '../../lang.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink, LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu: any[] = [];

  constructor(private languageService: LanguageService) {}

  async ngOnInit() {
    this.languageService.currentMenu.subscribe((menu) => {
      this.menu = menu.filter((item: any) => item.enabled);
    });
    this.languageService.loadMenu();
  }
}