import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { PlantaService } from '../../../services/plantaservice';
import { Planta } from '../../../models/Planta';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-plantaslistar',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterLink,
    DatePipe,
    MatCardModule
  ],
  templateUrl: './plantaslistar.html',
  styleUrl: './plantaslistar.css',
})
export class Plantaslistar implements OnInit {
  dataSource: MatTableDataSource<Planta> = new MatTableDataSource<Planta>();

  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'eli',
  ];

  // ⭐ Paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: PlantaService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      // ⭐ Asignar paginator después de setear el dataSource
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Plantas por página';
      });
    });
  }

  eliminar(id: number): void {
    this.pS.delete(id).subscribe(() => {
      this.pS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
