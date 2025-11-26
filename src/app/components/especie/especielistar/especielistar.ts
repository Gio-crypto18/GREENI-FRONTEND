import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Especieservice } from '../../../services/especieservice';
import { Especie } from '../../../models/Especie';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-especielistar',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,MatPaginator],
  templateUrl: './especielistar.html',
  styleUrl: './especielistar.css',
})
export class Especielistar implements OnInit {
dataSource: MatTableDataSource<Especie> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private eS: Especieservice) {}

   ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe(data=>{
      this.eS.list().subscribe(data=>{
        this.eS.setList(data)
      })
    })
  }
}
