
import { Component, inject, Input } from '@angular/core';
import { ContentService } from '../../content.service';
import { LanguageService } from '../../lang.service';
import { DropdownService } from '../../dropdown.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor],
  templateUrl: './services.component.html',
  styleUrl: '../home/home.component.css'
})
export class ServicesComponent {
  title: string = '';
  content: string = '';
  @Input() pageName!: string;

  countries: string[] = [];
  cities: string[] = [];

  selectedCountry: string = '';
  selectedCity: string = '';
  
  constructor(private langService: LanguageService, private dropdownService: DropdownService) { }

  ngOnInit() {
    this.langService.changePage('services');

    this.langService.currentPageContent.subscribe((content) => {
      this.title = content.title;
      this.content = content.content;
    });

    this.dropdownService.currentCountries.subscribe(countries => this.countries = countries);
    this.dropdownService.cities$.subscribe(cities => this.cities = cities);
    this.dropdownService.loadCountries();
  }

  onCountryChange(event: Event) {
    const country = (event.target as HTMLSelectElement).value;
    this.selectedCountry = country;
    console.log("country selected: ", country);
    this.dropdownService.loadCities(country);
  }
}
