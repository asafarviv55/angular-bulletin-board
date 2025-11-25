import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserProfile, UpdateProfileRequest, UserPreferences, ApiResponse } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiURL = 'http://localhost:8080/api/profiles';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getProfile(userId: number): Observable<UserProfile> {
    return this.httpClient.get<ApiResponse<UserProfile>>(`${this.apiURL}/${userId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getCurrentUserProfile(): Observable<UserProfile> {
    return this.httpClient.get<ApiResponse<UserProfile>>(`${this.apiURL}/me`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  updateProfile(userId: number, request: UpdateProfileRequest): Observable<UserProfile> {
    return this.httpClient.put<ApiResponse<UserProfile>>(`${this.apiURL}/${userId}`, JSON.stringify(request), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  updatePreferences(userId: number, preferences: UserPreferences): Observable<UserProfile> {
    return this.httpClient.put<ApiResponse<UserProfile>>(`${this.apiURL}/${userId}/preferences`, JSON.stringify(preferences), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  uploadAvatar(userId: number, file: File): Observable<UserProfile> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.httpClient.post<ApiResponse<UserProfile>>(`${this.apiURL}/${userId}/avatar`, formData)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  verifyEmail(userId: number, token: string): Observable<UserProfile> {
    return this.httpClient.post<ApiResponse<UserProfile>>(`${this.apiURL}/${userId}/verify-email`, JSON.stringify({ token }), this.httpOptions)
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
