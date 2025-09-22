import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-mood',
  imports: [RouterLink],
  templateUrl: './mood.html',
  styleUrl: './mood.css'
})
export class Mood implements OnInit {
  datum: string = '';
  uhrzeit: string = '';
  selectedMood: string = '';
  userId: string = '';
  userName: string = '';

  constructor(private router: Router) {}
//Auswahl Mood mit Zeit/Datum/Nutzername
  ngOnInit() {
    const now = new Date();
    this.userName = localStorage.getItem('name') || '';
    this.datum = now.toLocaleDateString('de-DE');
    this.uhrzeit = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    this.userId = localStorage.getItem('userId') || '';
  }
//Zwischenspeicherung von 'Mood'
  selectMood(mood: { name: string, image: string }) {
  localStorage.setItem('mood', mood.name);
  localStorage.setItem('moodImage', mood.image);

}
//Navigation zu Einträge-Verzeichnis
goToEintraege() {
  this.router.navigate(['/eintraege']);
}
}