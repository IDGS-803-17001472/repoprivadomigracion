import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service'; // Servicio para obtener citas
import { FullCalendarModule } from '@fullcalendar/angular'; // FullCalendar module
import { MatCardModule } from '@angular/material/card';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
    selector: 'app-cita-principal',
    imports: [FullCalendarModule, MatCardModule],
    templateUrl: './cita-principal.component.html',
    styleUrls: ['./cita-principal.component.scss']
})
export class CitaPrincipalComponent implements OnInit {  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this)
  };

  constructor(private router: Router, private citaService: PacienteService) {}

  ngOnInit() {
    this.citaService.getCitas().subscribe((citas: any[]) => {
      this.calendarOptions.events = citas.map(cita => ({
        id: cita.id,
        title: cita.title,
        date: cita.date,
        backgroundColor: cita.status === 'Aceptada' ? '#ccffcc' : '#ffcccc',
        textColor: '#000000',
      }));
    });
  }

  handleEventClick(info: any) {
    const eventId = info.event.id;
    this.router.navigate(['/citas/detalle-cita', eventId]);
  }

  handleDateClick(info: any) {
    const selectedDate = info.dateStr;
    this.router.navigate(['/citas/registrar-cita', selectedDate]);
  }
}
