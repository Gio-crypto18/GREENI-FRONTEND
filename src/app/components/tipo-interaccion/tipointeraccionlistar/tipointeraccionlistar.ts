import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { RouterLink } from '@angular/router';
import {
  MatPaginator,
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';

import { TipoInteraccion } from '../../../models/TipoInteraccion';
import { TipoInteraccionservice } from '../../../services/tipointeraccionservice';

function customPaginatorIntl(): MatPaginatorIntl {
  const intl = new MatPaginatorIntl();
  intl.itemsPerPageLabel = 'Tipos de interacción por página';
  intl.nextPageLabel = 'Siguiente página';
  intl.previousPageLabel = 'Página anterior';
  intl.firstPageLabel = 'Primera página';
  intl.lastPageLabel = 'Última página';
  intl.getRangeLabel = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} de ${length}`;
  };
  return intl;
}

@Component({
  selector: 'app-tipointeraccionlistar',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
  ],
  templateUrl: './tipointeraccionlistar.html',
  styleUrl: './tipointeraccionlistar.css',
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: customPaginatorIntl,
    },
  ],
})
export class Tipointeraccionlistar implements OnInit {
  dataSource: MatTableDataSource<TipoInteraccion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dS: TipoInteraccionservice) {}

  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      const ordenado = data.sort(
        (a, b) => a.tipoInteraccion_Id - b.tipoInteraccion_Id
      );
      this.dataSource = new MatTableDataSource(ordenado);
      this.dataSource.paginator = this.paginator;
    });

    this.dS.getList().subscribe((data) => {
      const ordenado = data.sort(
        (a, b) => a.tipoInteraccion_Id - b.tipoInteraccion_Id
      );
      this.dataSource = new MatTableDataSource(ordenado);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.dS.delete(id).subscribe(() => {
      this.dS.list().subscribe((data) => {
        const ordenado = data.sort(
          (a, b) => a.tipoInteraccion_Id - b.tipoInteraccion_Id
        );
        this.dS.setList(ordenado);
      });
    });
  }
}
