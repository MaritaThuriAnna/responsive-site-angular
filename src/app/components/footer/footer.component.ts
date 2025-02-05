import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';
import { NgIf } from '@angular/common';
import { LanguageService } from '../../lang.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  enabled = false;
  sticky = false;
  footerText = '';

  constructor(private languageService: LanguageService) {}

  ngOnInit() {

    this.languageService.currentFooter.subscribe((footer) => {
      this.footerText = footer.label;
      this.enabled = footer.enabled;
      this.sticky = footer.sticky;
    });

    this.languageService.loadFooter();
  }
}
