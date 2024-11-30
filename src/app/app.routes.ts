import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        canActivate: [AuthGuard] // Protege esta ruta
      },
      {
        path: 'paciente',
        loadChildren: () =>
          import('./pages/paciente/paciente.routes').then(
            (m) => m.UiComponentsRoutes
          ),
          canActivate: [AuthGuard] // Protege esta ruta
      },
      {
        path: 'contacto',
        loadChildren: () =>
          import('./pages/contacto/contacto.routes').then(
            (m) => m.ContactoRoutes
          ),
          canActivate: [AuthGuard] // Protege esta ruta
      },
      {
        path: 'diario',
        loadChildren: () =>
          import('./pages/diario/diario.routes').then(
            (m) => m.UiComponentsRoutes
          ),
          canActivate: [AuthGuard] // Protege esta ruta
      },
      {
        path: 'citas',
        loadChildren: () =>
          import('./pages/citas/citas.routes').then(
            (m) => m.UiComponentsRoutes
          ),
          canActivate: [AuthGuard] // Protege esta ruta
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('./pages/perfil/perfil.routes').then(
            (m) => m.PerfilRoutes
          ),
          canActivate: [AuthGuard] // Protege esta ruta
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
