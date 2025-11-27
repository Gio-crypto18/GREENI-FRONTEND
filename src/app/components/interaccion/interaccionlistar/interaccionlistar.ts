import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Interaccion } from '../../../models/Interaccion';
import { Interaccionservice } from '../../../services/interaccionservice';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-interaccionlistar',
  imports: [MatTableModule,CommonModule,MatIconModule,MatButtonModule,MatPaginator,RouterLink],
  templateUrl: './interaccionlistar.html',
  styleUrl: './interaccionlistar.css',
})

export class Interaccionlistar implements OnInit{
  dataSource: MatTableDataSource<Interaccion> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b',  'd','FK','fk2','j'];

  constructor(private iS: Interaccionservice) {}

  ngOnInit(): void {

    this.iS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.iS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }  
  eliminar(id:number){
    this.iS.delete(id).subscribe(data=>{
      this.iS.list().subscribe(data=>{
        this.iS.setList(data)
      })
    })
  }
}
