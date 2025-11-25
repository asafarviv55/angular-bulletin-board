import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category, CreateCategoryRequest, ApiResponse } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiURL = 'http://localhost:8080/api/categories';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<ApiResponse<Category[]>>(`${this.apiURL}/list`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getActive(): Observable<Category[]> {
    return this.httpClient.get<ApiResponse<Category[]>>(`${this.apiURL}/active`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getById(id: number): Observable<Category> {
    return this.httpClient.get<ApiResponse<Category>>(`${this.apiURL}/${id}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getBySlug(slug: string): Observable<Category> {
    return this.httpClient.get<ApiResponse<Category>>(`${this.apiURL}/slug/${slug}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  create(request: CreateCategoryRequest): Observable<Category> {
    return this.httpClient.post<ApiResponse<Category>>(`${this.apiURL}`, JSON.stringify(request), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  update(id: number, request: CreateCategoryRequest): Observable<Category> {
    return this.httpClient.put<ApiResponse<Category>>(`${this.apiURL}/${id}`, JSON.stringify(request), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<ApiResponse<void>>(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
