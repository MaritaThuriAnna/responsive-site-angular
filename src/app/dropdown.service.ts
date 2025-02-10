import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  //ensures subscribers get the most recent value immediately upon subscription
  private countriesSource = new BehaviorSubject<string[]>([]);
  //asObservable() converts BehaviorSubject into a read-only Observable
  //other components can subscribe to currentCountries, but they cannot modify it directly
  currentCountries = this.countriesSource.asObservable();


  private citiesSource = new BehaviorSubject<string[]>([]);
  cities$ = this.citiesSource.asObservable();

  constructor(private apiService: ApiService) {
  }

 loadCountries() {
    this.apiService.getCountries().subscribe(
      (countries) => {
        console.log("Countries loaded successfully:", countries);
        //saves the new value inside the BehaviorSubject and automatically notifies all subscribers/components.
        this.countriesSource.next(countries);
      },
      (error) => {
        console.error("Error loading countries:", error);
        this.countriesSource.next([]); 
      }
    );
  }

  loadCities(countryCode: string) {
    this.apiService.getCities(countryCode).subscribe((response: any) => {  
      if (!Array.isArray(response)) {
        console.error("Error: Unexpected API response structure:", response);
        return;
      }
  
      this.citiesSource.next(response); 
    });
  }
}
