import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppSalesOverviewComponent } from 'src/app/components/sales-overview/sales-overview.component';
import { AppYearlyBreakupComponent } from 'src/app/components/yearly-breakup/yearly-breakup.component';
import { AppMonthlyEarningsComponent } from 'src/app/components/monthly-earnings/monthly-earnings.component';
import { AppRecentTransactionsComponent } from 'src/app/components/recent-transactions/recent-transactions.component';
import { AppProductPerformanceComponent } from 'src/app/components/product-performance/product-performance.component';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { PacienteService } from 'src/app/services/paciente.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-starter',
    imports: [
        MaterialModule,CommonModule
    ],
    templateUrl: './starter.component.html',
    encapsulation: ViewEncapsulation.None
})
export class StarterComponent { 

    citasProximas: any[] = [];
    ultimosDiarios: any[] = [];
  
    constructor(
      private pacienteService: PacienteService,
      private router: Router
    ) {}
  
    ngOnInit() {
      this.pacienteService.getCitasProximas().subscribe((citas: any[]) => {
        this.citasProximas = citas.slice(0, 5); // Mostrar solo las 5 primeras citas
      });
  
      this.pacienteService.getUltimosDiarios().subscribe((diarios: any[]) => {
        console.log("ultimos diarios", diarios);
        this.ultimosDiarios = diarios.slice(0, 5); // Mostrar solo los 5 últimos diarios
      });
    }
  
    verDetalleCita(citaId: string) {
      this.router.navigate(['/citas/detalle-cita', citaId]);
    }
  
    verDetalleDiario(diarioId: string) {
      this.router.navigate(['/diarios/detalle', diarioId]);
    }
  }