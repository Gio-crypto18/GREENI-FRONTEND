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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './medicionlistar.html',
  styleUrl: './medicionlistar.css',
})
export class Medicionlistar implements OnInit {
  dataSource: MatTableDataSource<Medicion> = new MatTableDataSource<Medicion>();
  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'e', 'FK2', 'i', 'j'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS: Medicionservice,    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Mediciones por página';
      });
    });

    this.mS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number): void {
    this.mS.delete(id).subscribe(() => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
         this.snackBar.open('Se eliminó correctamente', 'Cerrar', {
          duration: 2000
        });
      });
    });
  }
}
