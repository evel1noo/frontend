import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}
ngOnInit() {
  this.http.get<any[]>('http://localhost:3000/entry/me', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }).subscribe(data => {
    this.entries = data
      .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime());
      this.cdr.detectChanges(); 
  });
}

  deleteEntry(entryId: string) {
  this.http.delete(`http://localhost:3000/entry/${entryId}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }).subscribe(() => {
    this.entries = this.entries.filter(entry => entry._id !== entryId);
    this.cdr.detectChanges(); 
  });
}

showConfirmDialog = false;
entryToDelete: string | null = null;

openConfirmDialog(entryId: string) {
  this.entryToDelete = entryId;
  this.showConfirmDialog = true;
}

closeConfirmDialog() {
  this.showConfirmDialog = false;
  this.entryToDelete = null;
}

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


openEditDialog(entry: any) {
  this.selectedEntry = { ...entry };
  this.showEditDialog = true;

}
closeEditDialog() {
  this.showEditDialog = false;
  this.selectedEntry = null;
}
saveEdits() {
  if (this.selectedEntry && this.selectedEntry._id) {
    this.http.patch(
      `http://localhost:3000/entry/${this.selectedEntry._id}`,
      this.selectedEntry,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    ).subscribe((response: any) => {
      // Das Backend gibt { message, entry } zurück
      const updatedEntry = response.entry;
      const idx = this.entries.findIndex(e => e._id === updatedEntry._id);
      if (idx > -1) {
        this.entries[idx] = updatedEntry;
      }
      this.closeEditDialog();
      this.cdr.detectChanges();
    });
  }
}
  toggleHabit(habit: any) {
    const idx = this.selectedEntry.habits.findIndex((h: any) => h.name === habit.name);
    if (idx > -1) {
      this.selectedEntry.habits.splice(idx, 1);
    } else {
      this.selectedEntry.habits.push(habit);
    }
  }
  hasHabit(habit: { name: string; image: string }): boolean {
  return this.selectedEntry?.habits?.some((h: any) => h.name === habit.name) ?? false;
}
goToMood() {
  this.router.navigate(['/mood']); 
}
}