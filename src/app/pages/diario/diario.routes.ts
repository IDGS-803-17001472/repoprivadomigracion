import { Routes } from '@angular/router';
import { PrincipalDiarioComponent } from './principal-diario/principal-diario.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

// ui

export const UiComponentsRoutes: Routes = [
  {
    path: ':id',
    component: PrincipalDiarioComponent,
    canActivate: [AuthGuard] // Protege esta ruta
  },
];
