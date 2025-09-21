import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient, private router: Router) {}


  login() {
   this.http.post<any>('http://localhost:3000/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: data => {
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