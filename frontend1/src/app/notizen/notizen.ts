import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notizen',
  imports: [FormsModule],
  templateUrl: './notizen.html',
  styleUrl: './notizen.css'
})
export class Notizen {
  notiz: string = '';
  error: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  saveEntry() {
  const userId = localStorage.getItem('userId') || '';
const mood = { name: localStorage.getItem('mood') || '', image: localStorage.getItem('moodImage') || '' };
  const habits = JSON.parse(localStorage.getItem('habits') || '[]');
  const datum = new Date();
  const uhrzeit = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  const token = localStorage.getItem('token');
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

  localStorage.setItem('notizen', this.notiz);

  this.http.post<any>('http://localhost:3000/entry', {
    userId,
    mood,
    habits,
    notizen: this.notiz,
    datum,
    uhrzeit
  }, { headers }).subscribe({
    next: () => {
      localStorage.removeItem('mood');
      localStorage.removeItem('moodImage');
      localStorage.removeItem('habits');
      localStorage.removeItem('notizen');
      
      this.router.navigate(['/eintraege']);
    },
    error: (err) => {
      this.error = err.error?.message || 'Speichern fehlgeschlagen!';
     
    }
  });
}}