import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  handleError(error: any): void {
    console.error('Global Error:', error);

    // alert('An unexpected error occurred. Please try again.');
  }
}
