import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SearchFilters, SearchResponse, SavedSearch, ApiResponse } from './search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiURL = 'http://localhost:8080/api/search';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  search(filters: SearchFilters, page: number = 1, pageSize: number = 20): Observable<SearchResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filters.keyword) params = params.set('keyword', filters.keyword);
    if (filters.categoryId) params = params.set('categoryId', filters.categoryId.toString());
    if (filters.minPrice !== undefined) params = params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params = params.set('maxPrice', filters.maxPrice.toString());
    if (filters.location) params = params.set('location', filters.location);
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters.sortOrder) params = params.set('sortOrder', filters.sortOrder);
    if (filters.condition) params = params.set('condition', filters.condition);
    if (filters.postedWithin) params = params.set('postedWithin', filters.postedWithin);

    return this.httpClient.get<ApiResponse<SearchResponse>>(`${this.apiURL}`, { params })
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getSavedSearches(userId: number): Observable<SavedSearch[]> {
    return this.httpClient.get<ApiResponse<SavedSearch[]>>(`${this.apiURL}/saved/${userId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  saveSearch(userId: number, name: string, filters: SearchFilters, emailNotifications: boolean = false): Observable<SavedSearch> {
    return this.httpClient.post<ApiResponse<SavedSearch>>(
      `${this.apiURL}/saved`,
      JSON.stringify({ userId, name, filters, emailNotifications }),
      this.httpOptions
    ).pipe(
      map(response => response.data),
      catchError(this.errorHandler)
    );
  }

  deleteSavedSearch(searchId: number): Observable<void> {
    return this.httpClient.delete<ApiResponse<void>>(`${this.apiURL}/saved/${searchId}`, this.httpOptions)
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
