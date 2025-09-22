import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-notizen',
  imports: [FormsModule],
  templateUrl: './notizen.html',
  styleUrl: './notizen.css'
})
export class Notizen {
  notiz: string = '';
  error: string = '';

  constructor(private router: Router, private apiService: ApiService) {}
//Zusammenfügen aller Daten für Eintrag, Speicherung in DB
  saveEntry() {
  const userId = localStorage.getItem('userId') || '';
  const mood = { name: localStorage.getItem('mood') || '', image: localStorage.getItem('moodImage') || '' };
  const habits = JSON.parse(localStorage.getItem('habits') || '[]');
  const datum = new Date();
  const uhrzeit = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  localStorage.setItem('notizen', this.notiz);

  this.apiService.createEntry({
    userId,
    mood,
    habits,
    notizen: this.notiz,
    datum,
    uhrzeit
  }).subscribe({
    next: () => {
      localStorage.removeItem('mood');
      localStorage.removeItem('moodImage');
      localStorage.removeItem('habits');
      localStorage.removeItem('notizen');
      
      this.router.navigate(['/eintraege']);
    },
    error: (err: any) => {
      this.error = err.error?.message || 'Speichern fehlgeschlagen!';
      if (err.status === 401 || err.status === 403) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    }
  });
}}