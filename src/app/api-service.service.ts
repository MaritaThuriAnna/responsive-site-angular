import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private BASE_URL_CITIES = 'https://countriesnow.space/api/v0.1/countries/cities';

  private BASE_URL_COUNTRIES = 'https://restcountries.com/v3.1/all'

  getCountries(): Observable< string[]> {
    return this.http.get<any[]>(`${this.BASE_URL_COUNTRIES}`).pipe(
      map(response => {
        if (!Array.isArray(response)) {
          console.error("API response is invalid (not an array):", response);
          return [];
        }
        console.log("API response :", response);

        const europeanCountries = response
        .filter(country => country.region === "Europe")
        .map((country: any) => country.name?.common);

        console.log("European Countries:", europeanCountries);
        return europeanCountries;
      })
    );
  }

  getCities(countryName: string): Observable<string[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { country: countryName };

    return this.http.post<any>(this.BASE_URL_CITIES, body, { headers }).pipe(
      map(response => {
        if (!response.data) {
          console.error(`No cities found for ${countryName}:`, response);
          return [];
        }

        console.log(`Cities for ${countryName}:`, response.data);
        return response.data;
      })
    );
  }
}
