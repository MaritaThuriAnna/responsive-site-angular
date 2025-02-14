import { Component, inject, Input } from '@angular/core';
import { ContentService } from '../../content.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../lang.service';
import { AuthService } from '../../components/login/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title: string = '';
  content: string = '';
  username: string | null = '';
  @Input() pageName!: string;

  constructor(private langService: LanguageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.langService.changePage('home');

    this.langService.currentPageContent.subscribe((content) => {
      this.title = content.title;
      this.content = content.content;
    });

    const storedUser = this.authService.getStoredUser();
    if (storedUser) {
      this.username = storedUser.displayName;
      console
    }
  }
}
