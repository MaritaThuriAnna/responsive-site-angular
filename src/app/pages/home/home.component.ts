import { Component, inject, Input } from '@angular/core';
import { ContentService } from '../../content.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../lang.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title: string = '';
  content: string = '';
  @Input() pageName!: string;

  constructor(private langService: LanguageService) {}

  ngOnInit() {
    this.langService.changePage('home');

    this.langService.currentPageContent.subscribe((content) => {
      this.title = content.title;
      this.content = content.content;
    });
  }
}
