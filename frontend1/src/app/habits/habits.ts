import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habits',
  imports: [NgClass, CommonModule],
  templateUrl: './habits.html',
  styleUrl: './habits.css'
})
export class Habits {
  gefuehleHabits = [
  { name: 'Aufgeregt', image: 'Aufgeregt.png' },
  { name: 'Dankbar', image: 'Dankbar.png' },
  { name: 'Zufrieden', image: 'Zufrieden.png' },
  {name: 'Gestresst', image: 'Gestresst.png' },
  { name: 'Traurig', image: 'Traurig.png' },
  { name: 'Wütend', image: 'Wütend.png' },
  { name: 'Glücklich', image: 'Glücklich.png' },
  { name: 'Müde', image: 'Müde.png' }
];
  schlafHabits = [
  { name: 'Gut', image: 'Gut.Schlaf.png' },
  { name: 'Mäßig', image: 'Mäßig.png' },
  { name: 'Schlecht', image: 'Schlecht.Schlaf.png' }
];
sozialHabits = [
  { name: 'Freunde', image: 'Freunde.png' },
  { name: 'Familie', image: 'Familie.png' },
  { name: 'Partner', image: 'Partner.png' },
  { name: 'Alleine', image: 'Alleine.png' }
];
schuleHabits = [
  { name: 'Lernen', image: 'Lernen.png' },
  { name: 'Hausaufgaben', image: 'Hausaufgaben.png' },
  { name: 'Prüfung', image: 'Prüfung.png' },
  { name: 'Gruppenarbeit', image: 'Gruppenarbeit.png' }
];

hobbysHabits = [
  { name: 'Spielen', image: 'Spielen.png' },
  { name: 'Malen', image: 'Malen.png' },
  { name: 'Musik', image: 'Musik.png' },
  { name: 'Filme', image: 'Filme.png' },
  { name: 'Lesen', image: 'Lesen.png' },
  { name: 'Training', image: 'Trainieren.png' },
  { name: 'Spazieren', image: 'Laufen.png' }
];

  selectedHabits: { name: string, image: string }[] = [];

  constructor(private router: Router) {}

  toggleActive(habit: { name: string, image: string }) {
   
    const index = this.selectedHabits.findIndex(h => h.name === habit.name);
    if (index === -1) {
      this.selectedHabits.push({ name: habit.name, image: habit.image });
    } else {
      this.selectedHabits.splice(index, 1);
    }
  }

isActive(habit: { name: string, image: string }): boolean {
  return this.selectedHabits.some(h => h.name === habit.name);
}

  saveHabits() {
    localStorage.setItem('habits', JSON.stringify(this.selectedHabits));
    this.router.navigate(['/notizen']);
  }
}