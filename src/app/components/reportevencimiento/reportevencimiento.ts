import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ChartData,
  ChartOptions,
} from 'chart.js';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { Diagnosticoservice } from '../../services/diagnosticoservice';
import { Tratamientoservice } from '../../services/tratamientoservice';

@Component({
  selector: 'app-reportevencimiento',
  imports: [CommonModule, BaseChartDirective, MatIconModule],
  templateUrl: './reportevencimiento.html',
  styleUrl: './reportevencimiento.css',
})
export class Reportevencimiento implements OnInit{
  hasData = false;


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
    private dS: Tratamientoservice,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.dS.getvenci().subscribe((data: any[]) => {
      if (data && data.length > 0) {
        this.hasData = true;

        const labels = data.map((item) => `Severidad ${item.severidad}`);
        const values = data.map((item) => item.getvenci);

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
      }
    });
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
