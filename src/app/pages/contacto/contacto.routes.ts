import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ContactoComponent } from './contacto.component';

// ui

export const ContactoRoutes : Routes = [
  {
    path: '',
    component: ContactoComponent,
    canActivate: [AuthGuard] // Protege esta ruta
  },
];
