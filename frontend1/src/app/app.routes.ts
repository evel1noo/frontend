import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Mood } from './mood/mood';
import { Habits } from './habits/habits';
import { Notizen } from './notizen/notizen';
import { Eintraege } from './eintraege/eintraege';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
    { path: '', component: Login }, 
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'mood', component: Mood, canActivate: [AuthGuard] },
    { path: 'habits', component: Habits,canActivate: [AuthGuard] },
    { path: 'notizen', component: Notizen, canActivate: [AuthGuard]},
    { path: 'eintraege', component: Eintraege, canActivate: [AuthGuard] },
];

