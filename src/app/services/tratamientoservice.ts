import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Tratamiento } from '../models/Tratamiento';



const base_url = enviroment.base

@Injectable({
  providedIn: 'root',
})

export class Tratamientoservice {
  getAmount() {
    throw new Error('Method not implemented.');
  }

  private url=`${base_url}/tratamiento`;
  private listaCambio = new Subject<Tratamiento[]>();
  constructor(private http: HttpClient) {}
  
  list(){
    return this.http.get<Tratamiento[]>(this.url);
  }

  insert(d: Tratamiento) {
    return this.http.post(this.url, d);
  }

  setList(listaNueva: Tratamiento[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }
   listId(id: number){
    return this.http.get<Tratamiento>(`${this.url}/${id}`);
  }
  update(r: Tratamiento) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
