import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EntryService {
  constructor(private http: HttpClient) {}
  addEintrag(eintrag: any): Observable<any[]> {
    return this.http.post<any[]>('http://localhost:3000/entry', eintrag);
  }

  getEntries(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/entry');
  }
}