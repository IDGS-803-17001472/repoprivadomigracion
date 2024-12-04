import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaHora'
})
export class FechaHoraPipe implements PipeTransform {
  transform(value: string, formato: 'fecha' | 'hora' | 'texto'): string {
    if (formato === 'fecha') {
      // Formatear fechas en español
      const date = new Date(value);
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }

    if (formato === 'hora') {
      // Manejar solo horas (sin fecha)
      const [hours, minutes] = value.split(':').map(Number);

      const date = new Date(); // Usar una fecha actual como base
      date.setHours(hours, minutes, 0);

      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }

    if (formato === 'texto') {
      // Manejar solo horas (sin fecha)
      const date = new Date(value);
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }

    return value;
  }
}