import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { LanguageService } from '../../lang.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' }
  ];

  languageService = inject(LanguageService);

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement; 
    const lang = target.value;
    
    if (lang) {
      console.log(`Switching to: ${lang}`);
      this.languageService.changeLanguage(lang);
    }
  }
  
}
