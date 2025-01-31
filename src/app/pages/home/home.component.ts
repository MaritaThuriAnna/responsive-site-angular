import { Component, inject } from '@angular/core';
import { ContentService } from '../../content.service';

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

  private contentService = inject(ContentService);

  ngOnInit() {
    const pageData = this.contentService.getPageContent('home');
    this.title = pageData.title;
    this.content = pageData.content;
  }
}
