import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const PerfilRoutes: Routes = [
  {
    path: '',
    component: PerfilComponent,
    canActivate: [AuthGuard] // Protege esta ruta
  },
];
