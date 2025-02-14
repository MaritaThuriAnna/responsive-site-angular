import { Component, inject, Input } from '@angular/core';
import { LanguageService } from '../../lang.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: '../home/home.component.css'
})
export class ContactComponent {
  title: string = '';
  content: string = '';
  @Input() pageName!: string;

  constructor(private langService: LanguageService) {}

  ngOnInit() {
    this.langService.changePage('contact');

    this.langService.currentPageContent.subscribe((content) => {
      this.title = content.title;
      this.content = content.content;
    });
  }
}
