import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSource = new BehaviorSubject<string>('en');  
  currentLanguage = this.languageSource.asObservable();

  private currentPageSource = new BehaviorSubject<string>('home');
  currentPage = this.currentPageSource.asObservable();

  private pageContentSource = new BehaviorSubject<{ title: string; content: string }>({
    title: '',
    content: ''
  });
  currentPageContent = this.pageContentSource.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); 
    this.loadPageContent('home');
  }


  changeLanguage(lang: string) {
    this.languageSource.next(lang);
    this.translate.use(lang).subscribe(() => {
      this.loadPageContent(this.currentPageSource.getValue()); 
    });
  }

  changePage(page: string) {
    this.currentPageSource.next(page); 
    this.loadPageContent(page);   
  }

  loadPageContent(page: string) {
    this.translate.get([`${page}.title`, `${page}.content`]).subscribe((translations) => {
      console.log(`Loaded Translations for ${page}:`, translations);
      this.pageContentSource.next({
        title: translations[`${page}.title`],
        content: translations[`${page}.content`]
      });
    });
  }
}