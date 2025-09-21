import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Login } from './login/login';
import { Footer } from './footer/footer';
import { Register } from './register/register';
import { Mood } from './mood/mood';
import { Habits } from './habits/habits';
import { Notizen } from './notizen/notizen';
import { Eintraege } from './eintraege/eintraege';



@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, Header, Login, Register, Footer, Mood, Habits, Notizen, Eintraege],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'projekt';
}