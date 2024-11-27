import { Routes } from '@angular/router';
import { PacienteComponent } from './paciente.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

// ui

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    component: PacienteComponent,
    canActivate: [AuthGuard] // Protege esta ruta
  },
];
