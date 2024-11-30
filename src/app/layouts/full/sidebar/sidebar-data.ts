import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Profesional',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
  {
    displayName: 'Pacientes',
    iconName: 'user',
    route: '/paciente',
  },
  {
    displayName: 'Citas',
    iconName: 'calendar-due',
    route: '/citas',
  },
  {
    displayName: 'Contáctanos',
    iconName: 'ballpen',
    route: '/contacto',
  },
];
