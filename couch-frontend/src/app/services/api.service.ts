import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUri: string = 'http://localhost:3001';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getTweets(view) {

    switch (view) {
      case 'environment':
        return this.http.get(`${this.baseUri}/environment-tweets`);
        break;

      case 'pollution':
        return this.http.get(`${this.baseUri}/pollution-tweets`);
        break;

      case 'accident':
        return this.http.get(`${this.baseUri}/accident-tweets`);
        break;

      case 'lavish':
        return this.http.get(`${this.baseUri}/lavishness-tweets`);
        break;

      default:
        break;
    }
  }

  getAurinData(view) {
    switch (view) {
      case 'medicare':
        return this.http.get(`${this.baseUri}/medicare-aurin`);
        break;

      default:
        break;
    }
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
