import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";
import { ConfigService } from "./config.service";
import { DropdownService } from "./dropdown.service";

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

  private menuSource = new BehaviorSubject<any[]>([]);
  currentMenu = this.menuSource.asObservable();

  private sidebarSource = new BehaviorSubject<any[]>([]);
  currentSidebar = this.sidebarSource.asObservable();

  private footerSource = new BehaviorSubject<{ label: string; enabled: boolean; sticky: boolean }>({
    label: '',
    enabled: false,
    sticky: false
  });
  currentFooter = this.footerSource.asObservable();

  constructor(
    private translate: TranslateService,
    private configService: ConfigService) {
    this.translate.setDefaultLang('en');
    this.loadPageContent('home');
    this.loadMenu();
    this.loadFooter();
    this.loadSidebar();
  }

  changeLanguage(lang: string) {
    this.languageSource.next(lang);
    this.translate.use(lang).subscribe(() => {
      console.log("Language switched to:", lang);
      this.loadPageContent(this.currentPageSource.getValue());
      this.loadMenu();
      this.loadFooter();
      this.loadSidebar();
    });
  }

  changePage(page: string) {
    this.currentPageSource.next(page);
    this.loadPageContent(page);
  }

  loadPageContent(page: string) {
    this.translate.get([`${page}.title`, `${page}.content`]).subscribe((translations) => {
      this.pageContentSource.next({
        title: translations[`${page}.title`],
        content: translations[`${page}.content`]
      });
    });
  }

  async loadMenu() {
    try {
      const config = await this.configService.loadConfig();
      this.translate.get('menu').subscribe((translations: any) => {
        const translatedMenu = config.menu.map((item: any) => ({
          ...item,
          label: translations[item.label] || item.label
        }));
        this.menuSource.next(translatedMenu);
      });

    } catch (error) {
    }
  }

  async loadFooter() {
    try {
      const config = await this.configService.loadConfig();
      this.translate.get('footer.label').subscribe((translatedText: string) => {
        const translatedFooter = {
          label: translatedText || config.footer.label,
          enabled: config.footer.enabled,
          sticky: config.footer.sticky
        };
        this.footerSource.next(translatedFooter);
      });

    } catch (error) {
    }
  }

  async loadSidebar() {
    try {
      const config = await this.configService.loadConfig();
      this.translate.get('sidebar').subscribe((translations: any) => {
        const translatedSidebar = config.sidebar.items.map((item: any) => ({
          ...item,
          label: translations[item.label] || item.label,
          subMenu: item.subMenu
            ? item.subMenu.map((sub: any) => ({
              ...sub,
              label: translations[sub.label] || sub.label
            }))
            : []
        }));
        this.sidebarSource.next(translatedSidebar);
      });

    } catch (error) {
      console.error("Failed to load sidebar:", error);
    }
  }
}