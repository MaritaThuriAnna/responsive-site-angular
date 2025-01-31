import { Component, inject } from '@angular/core';
import { ContentService } from '../../content.service';

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

  private contentService = inject(ContentService);

  ngOnInit() {
    const pageData = this.contentService.getPageContent('contact');
    this.title = pageData.title;
    this.content = pageData.content;
  }
}
