import { Component, inject, Input } from '@angular/core';
import { ContentService } from '../../content.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../lang.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: '../home/home.component.css'
})
export class AboutComponent {
  title: string = '';
  content: string = '';
  @Input() pageName!: string;

  constructor(private langService: LanguageService) {}

  ngOnInit() {
    this.langService.changePage('about');
    this.langService.currentPageContent.subscribe((content) => {
      this.title = content.title;
      this.content = content.content;
    });
  }
}
