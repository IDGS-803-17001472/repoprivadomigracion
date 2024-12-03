import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PrincipalDiarioComponent } from './principal-diario/principal-diario.component';
import { DetalleDiarioComponent } from './detalle-diario/detalle-diario.component';
import { DiarioDetalleComponent } from './diario-detalle/diario-detalle.component';

// ui

export const UiComponentsRoutes: Routes = [
  {
    path: ':id',
    component: PrincipalDiarioComponent,
    canActivate: [AuthGuard] // Protege esta ruta
  },
  {
  path: 'diario-detalle/:id',
  component: DetalleDiarioComponent,
  canActivate: [AuthGuard] // Protege esta ruta
},
];
