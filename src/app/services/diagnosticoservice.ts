import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Diagnostico } from '../models/Diagnostico';


const base_url = enviroment.base

@Injectable({
  providedIn: 'root',
})

export class Diagnosticoservice {
  getAmount(inicio: string, fin: string) {
    throw new Error('Method not implemented.');
  }

  private url=`${base_url}/diagnostico`;
  private listaCambio = new Subject<Diagnostico[]>();
  constructor(private http: HttpClient) {}
  
  list(){
    return this.http.get<Diagnostico[]>(this.url);
  }

  insert(d: Diagnostico) {
    return this.http.post(this.url, d);
  }

  setList(listaNueva: Diagnostico[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }
   listId(id: number){
    return this.http.get<Diagnostico>(`${this.url}/${id}`);
  }
  update(r: Diagnostico) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
