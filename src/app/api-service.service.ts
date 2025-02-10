import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private BASE_URL_CITIES = 'https://countriesnow.space/api/v0.1/countries/cities';

  private BASE_URL_COUNTRIES = 'https://restcountries.com/v3.1/all'

  getCountries(): Observable<string[]> {
    return this.http.get<any[]>(`${this.BASE_URL_COUNTRIES}`).pipe(
      tap(() => console.log("Fetching country data...")),
       // retry the request up to 2 times if it fails
      retry(2),
      map(response => {
        if (!Array.isArray(response)) {
          return [];
        }
        const europeanCountries = response
          .filter(country => country.region === "Europe")
          .map((country: any) => country.name?.common);

        console.log("European Countries Loaded:", europeanCountries);
        return europeanCountries;
      }),
      catchError(this.handleError) 
    );
  }

  getCities(countryName: string): Observable<string[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { country: countryName };

    return this.http.post<any>(this.BASE_URL_CITIES, body, { headers }).pipe(
      tap(() => console.log(`cities for ${countryName}...`)),
      retry(1), 
      map(response => {
        if (!response.data) {
          return [];
        }
        return response.data;
      }),
      catchError(this.handleError) 
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("API Error:", error);
    
    let errorMessage = "Something went wrong. Please try again later.";
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }
    alert(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
