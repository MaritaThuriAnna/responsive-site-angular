import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private pagesContent: { [key: string]: { title: string; content: string } } = {
    home: {
      title: 'Welcome to Your Site!',
      content: 'Explore our services, learn about the business, and get in touch!',
    },
    about: {
      title: 'About Us',
      content: 'We are a company dedicated to providing the best services to our customers.',
    },
    services: {
      title: 'Our Services',
      content: 'We offer a range of professional services to meet your needs.',
    },
    contact: {
      title: 'Contact Us',
      content: 'Reach out to us for inquiries, support, or collaboration opportunities.',
    },
  };

  getPageContent(page: string) {
    return this.pagesContent[page] || { title: 'Page Not Found', content: 'Content not available.' };
  }
}