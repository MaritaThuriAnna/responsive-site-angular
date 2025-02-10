
import { Component, inject, Input } from '@angular/core';
import { ContentService } from '../../content.service';
import { LanguageService } from '../../lang.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: '../home/home.component.css'
})
export class ServicesComponent {
  title: string = '';
   content: string = '';
   @Input() pageName!: string;
 
constructor(private langService: LanguageService) {}

  ngOnInit() {
    this.langService.changePage('services');

    this.langService.currentPageContent.subscribe((content) => {
      this.title = content.title;
      this.content = content.content;
    });
  }
}
