import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Medicion } from '../../../models/Medicion';
import { Medicionservice } from '../../../services/medicionservice';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-medicionlistar',
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
  templateUrl: './medicionlistar.html',
  styleUrl: './medicionlistar.css',
})
export class Medicionlistar implements OnInit {
  dataSource: MatTableDataSource<Medicion> = new MatTableDataSource<Medicion>();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'e', 'FK2', 'i', 'j'];

  // ⭐ Paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS: Medicionservice) {}

  ngOnInit(): void {
    // Carga inicial
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      // Conectamos el paginator una vez que ya hay datos y vista
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Mediciones por página';
      });
    });

    // 🔄 Escucha de cambios en la lista (cuando eliminas, etc.)
    this.mS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number): void {
    this.mS.delete(id).subscribe(() => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data); // esto dispara getList() y refresca la tabla
      });
    });
  }
}
