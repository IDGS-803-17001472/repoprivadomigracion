import { Routes } from '@angular/router';
import { CitaPrincipalComponent } from './cita-principal/cita-principal.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CitasDetalleComponent } from './citas-detalle/citas-detalle.component';
import { RegistroCitasComponent } from './registro-citas/registro-citas.component';

// ui

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    component: CitaPrincipalComponent,
    canActivate: [AuthGuard] // Protege esta ruta
  },
  {
    path: 'detalle-cita/:id',
    component: CitasDetalleComponent,
    canActivate: [AuthGuard] // Protege esta ruta
  },
  {
    path: 'registrar-cita/:date',
    component: RegistroCitasComponent,
    canActivate: [AuthGuard] // Protege esta ruta
  },
];
