import { Component, inject } from '@angular/core';
import { ContentService } from '../../content.service';

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

  private contentService = inject(ContentService);

  ngOnInit() {
    const pageData = this.contentService.getPageContent('about');
    this.title = pageData.title;
    this.content = pageData.content;
  }
}
