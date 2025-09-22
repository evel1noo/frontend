import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-eintraege',
  templateUrl: './eintraege.html',
  styleUrls: ['./eintraege.css'],
  standalone: true,
  imports: [DatePipe, CommonModule, FormsModule]
})
export class Eintraege implements OnInit {
  entries: any[] = [];
  moods = [
    { name: 'Super', image: 'Super.png' },
    { name: 'Gut', image: 'Gut.png' },
    { name: 'Okay', image: 'Okay.png' },
    { name: 'Schlecht', image: 'Schlecht.png' },
    { name: 'Furchtbar', image: 'Furchtbar.png' }
  ];
  allHabits = [
    { name: 'Alleine', image:'Alleine.png'},
    { name: 'Freunde', image: 'Freunde.png' },
    { name: 'Familie', image: 'Familie.png' },
    { name: 'Partner', image: 'Partner.png' },
    { name: 'Aufgeregt', image: 'Aufgeregt.png' },
    { name: 'Glücklich', image: 'Glücklich.png' },
    { name: 'Dankbar', image: 'Dankbar.png' },
    { name: 'Filme', image: 'Filme.png' },
    { name: 'Gestresst', image: 'Gestresst.png' },
    { name: 'Gruppenarbeit', image: 'Gruppenarbeit.png' },
    { name: 'Gut', image: 'Gut.Schlaf.png'},
    { name: 'Hausaufgaben', image: 'Hausaufgaben.png' },
    { name: 'Laufen', image: 'Laufen.png' },
    { name: 'Lernen', image: 'Lernen.png' },
    { name: 'Lesen', image: 'Lesen.png' },
    { name: 'Malen', image: 'Malen.png' },
    { name: 'Mäßig', image: 'Mäßig.png' },
    { name: 'Müde', image: 'Müde.png' },
    { name: 'Prüfung', image: 'Prüfung.png'},
    { name: 'Schlecht', image: 'Schlecht.Schlaf.png'},
    { name: 'Spielen', image: 'Spielen.png' },
    { name: 'Training', image: 'Trainieren.png' },
    { name: 'Zufrieden', image: 'Zufrieden.png' },
    { name: 'Musik', image: 'Musik.png' },
    { name: 'Traurig', image: 'Traurig.png' },
    { name: 'Wütend', image: 'Wütend.png' }
  ];
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router) {}
//lädt alle Einträge des eingeloggten Users
  ngOnInit() {
    this.apiService.getMyEntries().subscribe({
      next: (data: any) => {
        this.entries = data
          .sort((a: any, b: any) => new Date(b.datum).getTime() - new Date(a.datum).getTime());
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Fehler beim Laden der Einträge:', err);
        // Bei Authentifizierungsfehlern zur Login-Seite weiterleiten
        if (err.status === 401 || err.status === 403) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    });
  }
//Löschen von Einträgen
  deleteEntry(entryId: string) {
    this.apiService.deleteEntry(entryId).subscribe({
      next: () => {
        this.entries = this.entries.filter(entry => entry._id !== entryId);
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Fehler beim Löschen:', err);
        if (err.status === 401 || err.status === 403) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    });
  }

showConfirmDialog = false;
entryToDelete: string | null = null;

//Öffnen von Bestätigungsdialog
openConfirmDialog(entryId: string) {
  this.entryToDelete = entryId;
  this.showConfirmDialog = true;
}
// Schließt Bestätigungsdialog, ohne Löschung
closeConfirmDialog() {
  this.showConfirmDialog = false;
  this.entryToDelete = null;
}
//Bestätigung Löschen
confirmDelete() {
  if (this.entryToDelete) {
    this.deleteEntry(this.entryToDelete); 
    this.entries = this.entries.filter(entry => entry._id !== this.entryToDelete);
    this.closeConfirmDialog();
  }
}
selectedEntry: any = null;
showEditDialog = false;
entryToEdit: any = null;

//Öffnen des Editierdialogs
openEditDialog(entry: any) {
  this.selectedEntry = { ...entry };
  this.showEditDialog = true;

}
//Schließen des Editierdialogs
closeEditDialog() {
  this.showEditDialog = false;
  this.selectedEntry = null;
}
//Speicherung von veränderterten Einträgen
saveEdits() {
  if (this.selectedEntry && this.selectedEntry._id) {
    this.apiService.updateEntry(this.selectedEntry._id, this.selectedEntry).subscribe({
      next: (response: any) => {
        // Das Backend gibt { message, entry } zurück
        const updatedEntry = response.entry;
        const idx = this.entries.findIndex(e => e._id === updatedEntry._id);
        if (idx > -1) {
          this.entries[idx] = updatedEntry;
        }
        this.closeEditDialog();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Fehler beim Bearbeiten:', err);
        if (err.status === 401 || err.status === 403) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
//An-/Abwählen von Habits bei Bearbeitung
  toggleHabit(habit: any) {
    const idx = this.selectedEntry.habits.findIndex((h: any) => h.name === habit.name);
    if (idx > -1) {
      this.selectedEntry.habits.splice(idx, 1);
    } else {
      this.selectedEntry.habits.push(habit);
    }
  }
  //Darstellung ausgewählter Habits
  hasHabit(habit: { name: string; image: string }): boolean {
  return this.selectedEntry?.habits?.some((h: any) => h.name === habit.name) ?? false;
}
goToMood() {
  this.router.navigate(['/mood']); 
}
}