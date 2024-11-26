import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { PacienteComponent } from './paciente/paciente.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter' },
      ],
    },
  },
];
