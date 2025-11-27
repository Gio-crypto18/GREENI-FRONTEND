import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Interaccion } from '../models/Interaccion';



const base_url = enviroment.base

@Injectable({
  providedIn: 'root',
})

export class Interaccionservice {

  private url=`${base_url}/interaccion`;
  private listaCambio = new Subject<Interaccion[]>();
  constructor(private http: HttpClient) {}
  
  list(){
    return this.http.get<Interaccion[]>(this.url);
  }

  insert(d: Interaccion) {
    return this.http.post(this.url, d);
  }

  setList(listaNueva: Interaccion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }
   listId(id: number){
    return this.http.get<Interaccion>(`${this.url}/${id}`);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
