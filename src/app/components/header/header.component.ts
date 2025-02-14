import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import { LanguageService } from '../../lang.service';
import { AuthService } from '../login/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink, LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu: any[] = [];
  homeItem: any;

  isLoggedIn = false; 
  constructor(private languageService: LanguageService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {

    this.languageService.currentMenu.subscribe((menu) => {
      this.updateMenu(menu);
    });

    this.languageService.currentLanguage.subscribe(() => {
      this.languageService.loadMenu(); 
    });
    this.languageService.loadMenu();


    this.authService.authState.subscribe((user) => {
      this.isLoggedIn = !!user; 
    });

    // this.isLoggedIn = this.authService.isLoggedIn()
    this.isLoggedIn = await this.authService.isAuthenticated();
  }

  updateMenu(menu: any[]) {
    this.homeItem = menu.find(item => item.path === "/");
  
    // 🔥 Ensure "Home" is removed from `menu` to avoid duplication
    this.menu = menu.filter(item => item.enabled && item.path !== "/");
  }
  
  logout() {
    this.authService.SignOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}