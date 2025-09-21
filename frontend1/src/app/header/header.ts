import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
constructor (private router: Router) {}

logout() {
  localStorage.removeItem('name');
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('mood');
  localStorage.removeItem('moodImage');
  localStorage.removeItem('habits');
  localStorage.removeItem('notizen');
  localStorage.removeItem('isAdmin');
  this.router.navigate(['/']);
}
}
