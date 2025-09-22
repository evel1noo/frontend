import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Nicht autorisiert - Token fehlt');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Überprüfung ob User eingeloggt ist
  private checkAuth(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Nicht autorisiert - Bitte einloggen');
    }
  }

  // Auth Endpoints
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  // Entry Endpoints
  createEntry(entryData: any): Observable<any> {
    this.checkAuth();
    return this.http.post(`${this.apiUrl}/entry`, entryData, { headers: this.getHeaders() });
  }

  getMyEntries(): Observable<any[]> {
    this.checkAuth();
    return this.http.get<any[]>(`${this.apiUrl}/entry/me`, { headers: this.getHeaders() });
  }

  updateEntry(entryId: string, entryData: any): Observable<any> {
    this.checkAuth();
    return this.http.patch(`${this.apiUrl}/entry/${entryId}`, entryData, { headers: this.getHeaders() });
  }

  deleteEntry(entryId: string): Observable<any> {
    this.checkAuth();
    return this.http.delete(`${this.apiUrl}/entry/${entryId}`, { headers: this.getHeaders() });
  }
}