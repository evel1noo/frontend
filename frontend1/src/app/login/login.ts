import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink]
})
export class Login {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

//Authentifizierung Benutzer
  login() {
   this.apiService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (data: any) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('name', data.user.name);
          this.router.navigate(['/mood']);
        } else {
          this.error = data.message || 'Login fehlgeschlagen!';
        }
      },
      error: () => {
        this.error = 'Login fehlgeschlagen!';
      }
    });
  }
}