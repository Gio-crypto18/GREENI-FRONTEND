import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChartData, ChartOptions } from 'chart.js';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';

import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Diagnosticoservice } from '../../services/diagnosticoservice';

@Component({
  selector: 'app-reportecantidaddiagnostico',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './reportecantidaddiagnostico.html',
  styleUrl: './reportecantidaddiagnostico.css',
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideNativeDateAdapter(),
  ],
})
export class Reportecantidaddiagnostico implements OnInit {
  hasData = false;


  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;


  barChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };

  barChartType: 'doughnut' = 'doughnut';
  barChartLegend = true;

  barChartData: ChartData<'doughnut', number[], string> = {
    labels: [],
    datasets: [],
  };

  constructor(
    private dS: Diagnosticoservice,
    private location: Location
  ) {}

  ngOnInit(): void {
  }

  aplicarFiltro(): void {
    if (!this.fechaInicio || !this.fechaFin) {
      this.hasData = false;
      this.barChartData = { labels: [], datasets: [] };
      return;
    }

    const inicio = this.formatDate(this.fechaInicio);
    const fin = this.formatDate(this.fechaFin);

    this.dS.getQuantity(inicio, fin).subscribe({
      next: (data: any[]) => {
        if (data && data.length > 0) {
          this.hasData = true;

          const labels = data.map((item) => `Severidad ${item.severidad}`);
          const values = data.map((item) => item.quantity);

          this.barChartData = {
            labels,
            datasets: [
              {
                data: values,
                label: 'Cantidad de reportes de severidad',
                backgroundColor: [
                  '#75ddfc',
                  '#aeacf7',
                  '#fc9d75',
                  '#6ab56f',
                  '#ffc857',
                  '#ff6666',
                  '#33cc99',
                ],
              },
            ],
          };
        } else {
          this.hasData = false;
          this.barChartData = { labels: [], datasets: [] };
        }
      },
      error: (err) => {
        console.error('Error al cargar reporte', err);
        this.hasData = false;
        this.barChartData = { labels: [], datasets: [] };
      },
    });
  }

  private formatDate(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getColor(i: number): string {
    const ds = this.barChartData.datasets[0];
    const bg = ds?.backgroundColor as string[] | undefined;
    return bg?.[i] ?? '#6ab56f';
  }

  getValue(i: number): number {
    const ds = this.barChartData.datasets[0];
    const data = ds?.data as number[] | undefined;
    return data?.[i] ?? 0;
  }

  volver(): void {
    this.location.back();
  }
}
