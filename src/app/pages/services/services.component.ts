import { Component, inject } from '@angular/core';
import { ContentService } from '../../content.service';

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

  private contentService = inject(ContentService);

  ngOnInit() {
    // const pageData = this.contentService.getPageContent('services');
    // this.title = pageData.title;
    // this.content = pageData.content;
  }
}
