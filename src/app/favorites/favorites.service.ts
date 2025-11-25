import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Favorite, FavoriteCollection, CreateFavoriteRequest, ApiResponse } from './favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiURL = 'http://localhost:8080/api/favorites';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getFavorites(userId: number): Observable<Favorite[]> {
    return this.httpClient.get<ApiResponse<Favorite[]>>(`${this.apiURL}/user/${userId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getFavoritesByCollection(collectionId: number): Observable<Favorite[]> {
    return this.httpClient.get<ApiResponse<Favorite[]>>(`${this.apiURL}/collection/${collectionId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  addFavorite(request: CreateFavoriteRequest): Observable<Favorite> {
    return this.httpClient.post<ApiResponse<Favorite>>(`${this.apiURL}`, JSON.stringify(request), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  removeFavorite(favoriteId: number): Observable<void> {
    return this.httpClient.delete<ApiResponse<void>>(`${this.apiURL}/${favoriteId}`, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  isFavorite(userId: number, adId: number): Observable<boolean> {
    return this.httpClient.get<ApiResponse<boolean>>(`${this.apiURL}/check/${userId}/${adId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getCollections(userId: number): Observable<FavoriteCollection[]> {
    return this.httpClient.get<ApiResponse<FavoriteCollection[]>>(`${this.apiURL}/collections/${userId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  createCollection(userId: number, name: string, description?: string): Observable<FavoriteCollection> {
    return this.httpClient.post<ApiResponse<FavoriteCollection>>(
      `${this.apiURL}/collections`,
      JSON.stringify({ userId, name, description }),
      this.httpOptions
    ).pipe(
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
