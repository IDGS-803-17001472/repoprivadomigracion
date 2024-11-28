import { Routes } from '@angular/router';
import { PacienteComponent } from './paciente.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AgregarPacienteComponent } from './agregar-paciente/agregar-paciente.component';
import { DetallePacienteComponent } from './detalle-paciente/detalle-paciente.component';

// ui

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    component: PacienteComponent,
    canActivate: [AuthGuard] // Protege esta ruta
  },
  {
    path: 'agregar',
    component: AgregarPacienteComponent,
    canActivate: [AuthGuard] // Protege esta ruta
  },
  {
  path: 'detalle/:id',
  component: DetallePacienteComponent,
  canActivate: [AuthGuard] // Protege esta ruta
},
];
