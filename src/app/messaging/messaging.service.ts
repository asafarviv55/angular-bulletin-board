import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Message, Conversation, SendMessageRequest, ApiResponse } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private apiURL = 'http://localhost:8080/api/messages';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getConversations(userId: number): Observable<Conversation[]> {
    return this.httpClient.get<ApiResponse<Conversation[]>>(`${this.apiURL}/conversations/${userId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getConversation(conversationId: number): Observable<Conversation> {
    return this.httpClient.get<ApiResponse<Conversation>>(`${this.apiURL}/conversations/detail/${conversationId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getMessages(conversationId: number): Observable<Message[]> {
    return this.httpClient.get<ApiResponse<Message[]>>(`${this.apiURL}/conversation/${conversationId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  sendMessage(request: SendMessageRequest): Observable<Message> {
    return this.httpClient.post<ApiResponse<Message>>(`${this.apiURL}`, JSON.stringify(request), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  markAsRead(messageId: number): Observable<Message> {
    return this.httpClient.put<ApiResponse<Message>>(`${this.apiURL}/${messageId}/read`, {}, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  deleteMessage(messageId: number): Observable<void> {
    return this.httpClient.delete<ApiResponse<void>>(`${this.apiURL}/${messageId}`, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getUnreadCount(userId: number): Observable<number> {
    return this.httpClient.get<ApiResponse<number>>(`${this.apiURL}/unread/${userId}`)
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
